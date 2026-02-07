
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv('backend/.env')
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    print("API Key not found")
else:
    genai.configure(api_key=api_key)
    print("Listing models...")
    try:
        with open('models_out.txt', 'w') as f:
            for m in genai.list_models():
                if 'generateContent' in m.supported_generation_methods:
                    f.write(m.name + '\n')
                    print(m.name)
    except Exception as e:
        print(f"Error: {e}")
