import os
from fastapi import FastAPI, HTTPException, Response
from pydantic import BaseModel
from typing import List
from google import genai
from dotenv import load_dotenv

load_dotenv()

import logging

# Configure logging
logging.basicConfig(
    filename='backend.log',
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For MVP, allow all. In production, specify frontend URL.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Configure Gemini API
GENAI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GENAI_API_KEY:
    logger.error("GEMINI_API_KEY environment variable not set")
    raise ValueError("GEMINI_API_KEY environment variable not set")

client = genai.Client(api_key=GENAI_API_KEY)

class RelatedEvent(BaseModel):
    name: str
    probability: float

class PredictionRequest(BaseModel):
    target_event: str
    related_events: List[RelatedEvent]

class PredictionResponse(BaseModel):
    probability: float
    explanation: str

@app.get("/")
def read_root():
    return {"status": "online", "message": "Prediction Market Backend is running"}

@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    return Response(status_code=204)

@app.post("/predict", response_model=PredictionResponse)
async def predict(request: PredictionRequest):
    try:
        logger.info(f"Received prediction request: {request}")

        # Construct the prompt
        related_events_str = "\n".join([f"- {event.name}: {event.probability}%" for event in request.related_events])
        prompt = f"""
        You are an expert prediction market analyst.
        Analyze the following target event based on the probabilities of related events.
        
        Target Event: "{request.target_event}"
        
        Related Events:
        {related_events_str}
        
        Task:
        1. Estimate the probability of the Target Event occurring (0-100%).
        2. Provide a concise explanation (2-4 sentences) connecting the related events to your prediction.
        
        Output Format:
        Return ONLY a JSON object with the following keys:
        - "probability": (number)
        - "explanation": (string)
        """
        
        response = client.models.generate_content(model='gemini-2.0-flash', contents=prompt)
        # Basic parsing - in a real app, use structured output or more robust parsing
        # For this MVP, we'll assume the model follows instructions reasonably well or use text processing
        
        import json
        
        text_response = response.text.replace("```json", "").replace("```", "").strip()
        try:
            data = json.loads(text_response)
            return PredictionResponse(probability=data["probability"], explanation=data["explanation"])
        except json.JSONDecodeError:
             # Fallback if json parsing fails
             return PredictionResponse(probability=50.0, explanation="Error parsing AI response. Please try again.")

    except Exception as e:
        logger.error(f"Error processing request: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
