import json
import os
import re
from google.genai import Client as GeminiClient
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY not set")

client = GeminiClient(api_key=api_key)

def generate_educational_paths(user_interests, max_paths=3):
    prompt = f"""
    Generate {max_paths} educational paths for a student with these interests: {', '.join(user_interests)}.
    Each path must have these exact fields:
    field, match, uhCampus, degree, description, duration, avgSalary, jobGrowth,
    topCareers (array of {{"title", "salary", "demand", "companies"}}),
    uhPrograms (array of {{"name", "campus", "type"}}),
    keySkills (array of strings),
    nextSteps (array of strings).

    Output **only** a valid JSON array, nothing else.
    """

    # Create a chat session
    chat = client.chats.create(model="gemini-2.5-flash-lite")
    # Send the prompt
    response = chat.send_message(prompt)

    text = response.text  # this is the generated content
    print("Raw AI output:", text)

    # Extract the JSON array
    match = re.search(r"(\[.*\])", text, re.DOTALL)
    if not match:
        print("❌ No JSON array found in AI output")
        return []

    try:
        data = json.loads(match.group(1))
    except json.JSONDecodeError as e:
        print("❌ JSON decode error:", e)
        return []

    # Normalize each path so all expected keys exist
    def normalize(p):
        return {
            "field": p.get("field", ""),
            "match": p.get("match", 0),
            "uhCampus": p.get("uhCampus", ""),
            "degree": p.get("degree", ""),
            "description": p.get("description", ""),
            "duration": p.get("duration", ""),
            "avgSalary": p.get("avgSalary", ""),
            "jobGrowth": p.get("jobGrowth", ""),
            "topCareers": p.get("topCareers", []),
            "uhPrograms": p.get("uhPrograms", []),
            "keySkills": p.get("keySkills", []),
            "nextSteps": p.get("nextSteps", []),
        }

    return [normalize(p) for p in data]


if __name__ == "__main__":
    user_interests = ["game design", "interactive media", "psychology"]
    paths = generate_educational_paths(user_interests, max_paths=3)

    print(f"✅ Generated {len(paths)} educational paths")
    print(paths)

    if paths:
        with open("educationalPaths.js", "w") as f:
            f.write("export const educationalPaths = ")
            json.dump(paths, f, indent=2)
            f.write(";")
        print("✅ educationalPaths.js ready for React")
