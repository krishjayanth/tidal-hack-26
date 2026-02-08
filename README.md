# ApolloMarkets

<div align="center">
  <h3>The Future Isn't a Mystery. It's an Equation.</h3>
  <p>High-Fidelity AI Synthesis for Prediction Market Alpha.</p>
  https://tidal-hack-26.vercel.app/
</div>

---

## 🚀 Overview

**ApolloMarkets** is a next-generation intelligence platform designed to validate and predict probabilities for prediction markets (like Polymarket). By leveraging advanced Large Language Models (LLMs) via OpenRouter (specifically optimized for reasoning models like DeepSeek R1), ApolloMarkets synthesizes "Correlated Signals"—related real-world events—to calculate a more accurate "True Probability" than the current market consensus.

It detects market inefficiencies, providing an **Alpha Index** and **Confidence Score** to help traders identify undervalued or overvalued positions.

## ✨ Key Features

-   **High-Fidelity Synthesis**: Uses Bayesian-style inference to adjust probabilities based on correlated event outcomes.
-   **Correlated Signal Analysis**: Manually input related events (e.g., "Fed Rate Cut" vs. "Bitcoin Price") to see how they impact the target prediction.
-   **Quantitative "Apollo Prob"**: Generates a distinct probability coupled with a divergence metric (Delta) from the market price.
-   **Confidence & Alpha Scoring**: specific metrics to gauge the strength of the prediction and the potential market inefficiency.
-   **Visual Intel**: Interactive charts visualizing the spread between Market Price and Apollo's Predicted Probability.
-   **Reasoning Engine**: Provides a detailed, text-based synthesis report explaining the *why* behind the numbers.

## 🛠️ Tech Stack

-   **Frontend Framework**: React 19 (via Vite)
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS (Custom "Slate & Indigo" premium aesthetic)
-   **Visualization**: Recharts
-   **AI Intelligence**: OpenRouter API (DeepSeek R1 / Chimera)
-   **State Management**: React Hooks

## ⚡ Getting Started

### Prerequisites

-   Node.js (v18 or higher recommended)
-   npm or yarn
-   An API Key from [OpenRouter](https://openrouter.ai/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/apollomarkets-local.git
    cd apollomarkets-local
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment:**
    Create a `.env.local` file in the root directory and add your OpenRouter API key:
    ```env
    VITE_OPENROUTER_API_KEY=sk-or-your-actual-api-key-here
    VITE_SITE_URL=http://localhost:5173
    VITE_SITE_NAME=ApolloMarkets
    ```

4.  **Run the application:**
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🧩 Usage

1.  **Define Target**: Enter the Market Question you want to analyze (e.g., "Will Bitcoin hit $100k?").
2.  **Set Market Price**: Input the current trading probability from the prediction market.
3.  **Add Signals**: Add 2-3 "Correlated Signals"—events that, if true or false, would significantly impact the target.
    *   *Example: "Fed Cuts Rates by 50bps" (High Correlation to Crypto Asset Prices)*
4.  **Run Analysis**: Click "Run Analysis" to let the AI agent synthesize the data.
5.  **Review Intel**: Read the generated report and check the "Apollo Prob" vs. "Market Price" to find your edge.

## ⚠️ Disclaimer

**ApolloMarkets is a research tool.** The predictions generated are probabilistic estimates based on AI synthesis of provided inputs. They do not constitute financial advice. Prediction markets involve significant risk.


