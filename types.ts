
export interface PredictionEvent {
  id: string;
  name: string;
  description: string;
  probability: number; // 0-100
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface AnalysisResult {
  predictedProbability: number;
  reasoning: string;
  sources: GroundingSource[];
  confidence: number;
  delta: number;
}
