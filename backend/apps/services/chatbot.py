from dotenv import load_dotenv
from google import genai
import os

load_dotenv() # Load variables from .env

gemini_api_key = os.getenv("GEMINI_API_KEY")
if not gemini_api_key:
    raise ValueError("GEMINI_API_KEY not found in environment variables")

client = genai.Client(api_key=gemini_api_key)

response = client.models.generate_content(
    model="gemini-2.5-flash", contents="Suggest career options for a person who likes programming."
)
print(response.text)