from flask import Blueprint, request, jsonify
from dotenv import load_dotenv
from supabase import create_client, Client
import os
import json
import time
from google.genai import Client as GeminiClient
from backend.apps.services.pathways import generate_educational_paths


# Load environment variables from .env
load_dotenv()

# Fetch variables
USER = os.getenv("user")
PASSWORD = os.getenv("password")
HOST = os.getenv("host")
PORT = os.getenv("port")
DBNAME = os.getenv("dbname")

# Connect to supabase database
DATABASE_URL: str = os.getenv("DATABASE_URL")
#DATABASE_URL = f"postgres://{USER}:{PASSWORD}@{HOST}:{PORT}/{DBNAME}"

# Publishable supabase key
SUPABASE_KEY: str = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(DATABASE_URL, SUPABASE_KEY)

# Gemini setup
client = GeminiClient(api_key=os.getenv("GEMINI_API_KEY"))

api_bp = Blueprint('api', __name__, url_prefix='/api')  

# User signup route
@api_bp.route('/signup', methods=['POST', 'OPTIONS'])
def signup():
    if request.method == "OPTIONS":
        # Preflight request success response
        return "", 200
    if not request.is_json:
        return jsonify({"message": "Request must be JSON"}), 400
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Check if email in database already exists
    response = (
        supabase.table("profiles")
        .select("email")
        .eq("email", email)
        .maybe_single()
        .execute()
    )
    if response is not None and response.data is not None:
        return jsonify({"message": "A profile with this email already exists"}), 400
    
    # TODO Hash password and insert new user into database
    hashed_password = password 
    response = (
        supabase.table("profiles")
        .insert({"email": email, "password": password, "student_status": "freshmen", "attending_campus": "manoa"})
        .execute()
    )
    return jsonify({"message": "User created successfully"}), 201

# User login route
@api_bp.route('/login', methods=['POST', 'OPTIONS'])
def login():
    if request.method == "OPTIONS":
        # Preflight request success response
        return "", 200
    if not request.is_json:
        return jsonify({"message": "Request must be JSON"}), 400
    
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    hashed_password = password

    # Check database for user with matching email and password
    response = (
        supabase.table("profiles")
        .select("email", "password")
        .eq("email", email)
        .eq("password", hashed_password)
        .maybe_single()
        .execute()
    )
    if response is not None and response.data is not None:
        return jsonify({"message": "Login successful", "loginAttempt": "success"}), 200
    return jsonify({"message": "Invalid credentials", "loginAttempt": "fail"}), 401

# AI-generated educational pathways route
@api_bp.route("/ai-paths", methods=["POST"])
def ai_paths():
    data = request.json
    interests = data.get("interests", [])
    if not interests:
        return jsonify({"error": "No interests provided"}), 400
    paths = generate_educational_paths(interests, max_paths=3)
    if paths is None:
        return jsonify({"error": "AI failed to generate paths"}), 500
    return jsonify(paths)



# # JSON Schema reminder for the AI
# PATH_SCHEMA_DESCRIPTION = """
# Return an array of objects with these required fields:
# field, match, gradient, uhCampus, degree, description, duration, avgSalary,
# jobGrowth, topCareers (array of {title, salary, demand, companies}),
# uhPrograms (array of {name, campus, type}),
# keySkills (array of strings),
# nextSteps (array of strings)
# All percentages are 0-100 numbers, text should be concise and exciting.
# """

# @api_bp.route('/ai-paths', methods=['POST'])
# def ai_paths():
#     data = request.json
#     user_profile = data.get('profile', {})
    
#     prompt = f"""
# You are an AI UH Pathfinder. Given the following user profile, generate an array of educational/career paths in JSON.
# User profile: {json.dumps(user_profile)}

# {PATH_SCHEMA_DESCRIPTION}

# Return valid JSON ONLY. No explanations.
# """
#     try:
#         ai_response = client.generate(prompt=prompt)  # replace with Gemini method to get text
#         paths_json = json.loads(ai_response)  # ensure valid JSON
#         return jsonify(paths_json)
#     except json.JSONDecodeError as e:
#         return jsonify({"error": "AI returned invalid JSON", "details": str(e), "raw": ai_response}), 500
#     except Exception as e:
#         return jsonify({"error": "Unexpected error", "details": str(e)}), 500



# router = Blueprint("ai_interests", __name__)
# @router.post("/rank-interests")
# def rank_interests():
#     data = request.json
#     user_message = data["message"]
#     interests = data["interests"]

#     prompt = f"""
#     The user said: "{user_message}"
#     Here are the possible interests to evaluate:
#     {json.dumps(interests)}
#     Rank these interests based on how closely they relate to the user's interests.
#     Use these labels ONLY:
#     - "Excellent Match" → highly relevant
#     - "Good Match" → somewhat relevant
#     - "Possible Match" → could be relevant but not strong
#     - "Weak Match" → barely relevant
#     - "Not Relevant" → unrelated
#     Return ONLY valid JSON in this structure:
#     [
#       {{
#         "id": "",
#         "interest_name": "",
#         "match_level": ""
#       }}
#     ]
#     """

#     response = client.responses.generate(
#         model="gemini-2.5-flash-lite",
#         input=prompt
#     )

#     text = response.output_text.strip().replace("```json", "").replace("```", "")

#     try:
#         ranked = json.loads(text)
#     except Exception:
#         return jsonify({"error": "Invalid AI JSON", "raw": text}), 500

#     return jsonify(ranked)



@api_bp.route('/generate-pathways', methods=['POST', 'OPTIONS'])
def generate_pathways():
    if request.method == "OPTIONS":
        return "", 200
    
    if not request.is_json:
        return jsonify({"message": "Request must be JSON"}), 400
    
    data = request.get_json()
    user_id = data.get('user_id')
    top_interests = data.get('interests', [])  # Array of interest objects with match_level
    
    # Filter for high-match interests only
    relevant_interests = [
        interest for interest in top_interests 
        if interest.get('match_level') in ['Excellent Match', 'Good Match']
    ]
    
    if not relevant_interests:
        return jsonify({"message": "No relevant interests found"}), 400
    
    # Create prompt for Gemini
    interests_text = ", ".join([i['interest_name'] for i in relevant_interests])
    
    prompt = f"""
You are a UH (University of Hawaii) career pathway advisor. Based on these student interests: {interests_text}

Generate EXACTLY 3 career pathways that:
1. Align with their interests
2. Are available at UH system campuses (UH Mānoa, UH Hilo, UH West O'ahu, or community colleges)
3. Have strong career outcomes

For each pathway, provide detailed information in this EXACT JSON structure:
[
  {{
    "field": "Career Field Name",
    "match": 95,
    "uhCampus": "UH Campus Name",
    "degree": "Degree Program Name",
    "description": "Detailed description connecting interests to career (2 sentences)",
    "duration": "4 years",
    "avgSalary": "$XX,000",
    "jobGrowth": "+XX%",
    "topCareers": [
      {{
        "title": "Job Title",
        "salary": "$XX,000-$XX,000",
        "demand": "High/Very High/Medium",
        "companies": ["Company1", "Company2", "Company3"]
      }},
      {{
        "title": "Job Title 2",
        "salary": "$XX,000-$XX,000",
        "demand": "High/Very High/Medium",
        "companies": ["Company1", "Company2", "Company3"]
      }},
      {{
        "title": "Job Title 3",
        "salary": "$XX,000-$XX,000",
        "demand": "High/Very High/Medium",
        "companies": ["Company1", "Company2", "Company3"]
      }}
    ],
    "uhPrograms": [
      {{
        "name": "Program Name",
        "campus": "UH Campus",
        "type": "Bachelor's/Certificate/Associate"
      }},
      {{
        "name": "Related Program Name",
        "campus": "UH Campus",
        "type": "Bachelor's/Certificate/Associate"
      }},
      {{
        "name": "Certificate Program",
        "campus": "UH Campus",
        "type": "Certificate"
      }}
    ],
    "keySkills": ["Skill1", "Skill2", "Skill3", "Skill4", "Skill5"],
    "nextSteps": ["Step 1", "Step 2", "Step 3"]
  }}
]

IMPORTANT:
- Match score: First pathway 95-98, second 92-95, third 88-92
- Use REAL UH programs from Mānoa, Hilo, West O'ahu, or community colleges
- Salary and growth data should be realistic for 2025
- Return ONLY valid JSON, no markdown formatting
- Each pathway must have exactly 3 topCareers, 3 uhPrograms, 5 keySkills, and 3 nextSteps
"""
    
    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash-exp",
            contents=prompt
        )
        
        # Extract and clean the response
        text = response.text.strip()
        # Remove markdown code blocks if present
        text = text.replace("```json", "").replace("```", "").strip()
        
        # Parse JSON
        pathways = json.loads(text)
        
        # Validate structure
        if not isinstance(pathways, list) or len(pathways) != 3:
            return jsonify({"error": "Invalid pathway structure"}), 500
        
        # Store pathways in database for this user (optional)
        # supabase.table("user_pathways").insert({
        #     "user_id": user_id,
        #     "pathways": pathways,
        #     "generated_at": "now()"
        # }).execute()
        
        return jsonify({"pathways": pathways}), 200
        
    except json.JSONDecodeError as e:
        return jsonify({
            "error": "Failed to parse AI response",
            "details": str(e),
            "raw_response": text[:500]
        }), 500
    except Exception as e:
        return jsonify({
            "error": "Failed to generate pathways",
            "details": str(e)
        }), 500





# # Chat route
# router = Blueprint("chat", __name__)

# supabase = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_KEY"))
# client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# @router.post("/chat")
# def chat():
#     data = request.json
#     user_message = data.get("message", "")

#     # 1. Fetch interests that match user's message
#     matches = supabase.table("interests") \
#         .select("*") \
#         .ilike("keywords", f"%{user_message}%") \
#         .execute()

#     matched_interests = matches.data[:5]  # top 5 matches

#     # 2. Ask AI to respond using the matched interests as context
#     context = "\n".join([f"- {i['interest_name']} ({i['category']})" for i in matched_interests])

#     prompt = f"""
#     The user said: "{user_message}"

#     Based on their interests, here are the top related pathways:

#     {context}

#     Now respond conversationally and recommend degree programs or next steps.
#     """

#     response = client.chat.completions.create(
#         model="gpt-4.1-mini",
#         messages=[{"role": "assistant", "content": prompt}]
#     )

#     return jsonify({"response": response.choices[0].message.content})
