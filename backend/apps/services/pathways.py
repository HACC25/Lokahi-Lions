import json
import os
import re
from google.genai import Client as GeminiClient
from dotenv import load_dotenv
import supabase
from supabase import create_client, Client

# Load environment variables
load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not api_key:
    raise ValueError("GEMINI_API_KEY not set")

# Initialize clients
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

client = GeminiClient(api_key=api_key)

def get_user_interests(email: str):
    # Fetch the row from 'profiles' table matching the user's email
    response = (
        supabase.table("profiles")
        .select("interests")  # only grab the interests column
        .eq("email", email)   # match the user's email
        .maybe_single()       # returns None if no match
        .execute()
    )

    if response is None or response.data is None:
        return []  # No interests found

    return response.data.get("interests", [])



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
    user_email = "student@example.com"  # the email of the user you want to fetch
    #Fetch the user's interests from Supabase
    user_interests = get_user_interests(user_email)

    if not user_interests:
        print(f"No interests found for {user_email}")
    else:
        #Pass those interests into AI function
        paths = generate_educational_paths(user_interests, max_paths=3)

        print(f"✅ Generated {len(paths)} educational paths")
        print(paths)

        # write to JS file for React
        if paths:
            with open("educationalPaths.js", "w") as f:
                f.write("export const educationalPaths = ")
                json.dump(paths, f, indent=2)
                f.write(";")
            print("✅ educationalPaths.js ready for React")
