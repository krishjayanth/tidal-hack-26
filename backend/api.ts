export interface RelatedEvent {
  name: string;
  probability: number;
}

export interface PredictionResponse {
  probability: number;
  explanation: string;
}

const API_BASE_URL = "http://localhost:8000";

export const fetchPrediction = async (
  targetEvent: string,
  relatedEvents: RelatedEvent[]
): Promise<PredictionResponse> => {
  const response = await fetch(`${API_BASE_URL}/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      target_event: targetEvent,
      related_events: relatedEvents,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || "Failed to fetch prediction");
  }

  return response.json();
};