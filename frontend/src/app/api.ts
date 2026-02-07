export interface PredictionResponse {
    probability: number;
    explanation: string;
}

export interface RelatedEvent {
    name: string;
    probability: number;
}

export const predictProbability = async (
    targetEvent: string,
    relatedEvents: RelatedEvent[]
): Promise<PredictionResponse> => {
    const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            target_event: targetEvent,
            related_events: relatedEvents,
        }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Failed to fetch prediction');
    }

    return response.json();
};
