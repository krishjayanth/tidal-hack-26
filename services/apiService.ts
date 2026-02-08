
import { PredictionEvent, AnalysisResult, GroundingSource } from "../types";

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const SITE_URL = import.meta.env.VITE_SITE_URL || "http://localhost:5173";
const SITE_NAME = import.meta.env.VITE_SITE_NAME || "ApolloMarkets";

// Cache Configuration
const CACHE_PREFIX = "apollo_market_cache_";
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

interface CachedAnalysis {
  timestamp: number;
  data: AnalysisResult;
}

const generateCacheKey = (target: PredictionEvent, related: PredictionEvent[]): string => {
  const parts = [
    target.id,
    target.name,
    target.probability,
    ...related.map(r => `${r.id}:${r.name}:${r.probability}`)
  ];
  return `${CACHE_PREFIX}${parts.join("|")}`;
};

const getCachedResult = (key: string): AnalysisResult | null => {
  try {
    const item = localStorage.getItem(key);
    if (!item) return null;

    const parsed: CachedAnalysis = JSON.parse(item);
    const now = Date.now();

    if (now - parsed.timestamp > CACHE_TTL_MS) {
      localStorage.removeItem(key);
      return null;
    }

    return parsed.data;
  } catch (e) {
    console.warn("Failed to retrieve cache", e);
    return null;
  }
};

const setCachedResult = (key: string, data: AnalysisResult) => {
  try {
    const cacheItem: CachedAnalysis = {
      timestamp: Date.now(),
      data
    };
    localStorage.setItem(key, JSON.stringify(cacheItem));
  } catch (e) {
    console.warn("Failed to set cache", e);
  }
};

export const analyzeMarket = async (
  target: PredictionEvent,
  related: PredictionEvent[]
): Promise<AnalysisResult> => {
  const cacheKey = generateCacheKey(target, related);
  const cached = getCachedResult(cacheKey);

  if (cached) {
    console.log("Returning cached analysis result");
    return cached;
  }

  console.log("Fetching fresh analysis from OpenRouter...");

  if (!OPENROUTER_API_KEY) {
    throw new Error("OpenRouter API Key is missing. Please set VITE_OPENROUTER_API_KEY in .env.local");
  }

  const relatedContext = related
    .map(r => `- SIGNAL: "${r.name}" (Trading at ${r.probability}%): ${r.description}`)
    .join('\n');

  const systemInstructions = `
    ACT AS: ApolloMarkets, a world-class quantitative startup specializing in prediction market arbitrage.
    
    MISSION OBJECTIVE: You are an arbiter of truth. Your goal is to CALCULATE the "True Probability" of a Target Event happening, based *strictly* on the provided Correlated Signals.

    CRITICAL INSTRUCTION:
    - DISREGARD the "Current Market Trading Value" as a baseline. It represents the *crowd's* potential error.
    - You must output a NEW probability. Do not just return the market value.
    - If the Correlated Signals (Trading at X%) strongly suggest the event will happen, your Predicted Probability should be HIGHER than the market.
    - If the Correlated Signals dispute the event, your Predicted Probability should be LOWER.
    - Use Bayesian inference logic: Start with a prior (maybe 50% or the market value), but update it HEAVILY based on the "Signal Strength" and "Probability" of the related events.

    REPORT FORMAT (STRICT MARKDOWN):
    
    PREDICTED_PROBABILITY: [X]%
    CONFIDENCE_SCORE: [Y]%
    
    ### Analysis Report
    [Provide a sharp, quantitative justification. EXPLAIN EXACTLY how the correlated signals shifted your probability from the market price.]
  `;

  const userPrompt = `
    TARGET EVENT: "${target.name}"
    DESCRIPTION: "${target.description}"
    Current Crowd Price: ${target.probability}%  <-- TREAT THIS AS POTENTIALLY WRONG.

    CORRELATED SIGNALS (The Alpha):
    ${relatedContext}

    TASK:
    1. Analyze each signal's probability.
    2. If a signal is highly correlated and has High Probability, it implies the Target should also be High.
    3. If a signal is highly correlated but has Low Probability, it implies the Target should be Low.
    4. CALCULATE the Adjusted Probability.
  `;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": SITE_URL,
        "X-Title": SITE_NAME,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "tngtech/deepseek-r1t2-chimera:free", // Use free model as requested
        messages: [
          {
            role: "system",
            content: systemInstructions
          },
          {
            role: "user",
            content: userPrompt
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`OpenRouter API Error: ${response.status} ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || "";

    // Parse the result
    const probMatch = text.match(/PREDICTED_PROBABILITY:\s*(\d+(?:\.\d+)?)/i);
    const confMatch = text.match(/CONFIDENCE_SCORE:\s*(\d+(?:\.\d+)?)/i);

    const predictedProbability = probMatch ? parseFloat(probMatch[1]) : target.probability;
    const confidence = confMatch ? parseFloat(confMatch[1]) : 70;

    // OpenRouter/DeepSeek doesn't natively return grounding chunks in the same format as Gemini.
    // We'll leave sources empty for now or parse them if the model provides links (it usually doesn't unless asked).
    const sources: GroundingSource[] = [];

    const result: AnalysisResult = {
      predictedProbability,
      reasoning: text.split('### Analysis Report')[1] || text,
      sources,
      confidence,
      delta: predictedProbability - target.probability,
    };

    setCachedResult(cacheKey, result);
    return result;

  } catch (error) {
    console.error("Analysis failed:", error);
    throw error;
  }
};