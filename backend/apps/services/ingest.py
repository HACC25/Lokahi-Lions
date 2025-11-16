import os
import time
from dotenv import load_dotenv
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from supabase.client import create_client

# Load environment variables
load_dotenv()

# Configuration
BATCH_SIZE = 100
DELAY_BETWEEN_BATCHES = 2  # seconds
MAX_RETRIES = 3

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not all([SUPABASE_URL, SUPABASE_KEY, GEMINI_API_KEY]):
    raise ValueError("Make sure SUPABASE_URL, SUPABASE_KEY, and GEMINI_API_KEY are set in your .env")

# Initialize Supabase client
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# Initialize embedding model
embeddings = GoogleGenerativeAIEmbeddings(
    model="gemini-embedding-001",
    google_api_key=GEMINI_API_KEY
)

# List of school tables
school_tables = [
    {"course": "hawaiicc_courses", "school": "Hawaii Community College"},
    {"course": "hilo_courses", "school": "University of Hawaii at Hilo"},
    {"course": "honolulucc_courses", "school": "Honolulu Community College"},
    {"course": "kapiolani_courses", "school": "Kapiolani Community College"},
    {"course": "kauai_courses", "school": "Kauai Community College"},
    {"course": "leeward_courses", "school": "Leeward Community College"},
    {"course": "manoa_courses", "school": "University of Hawaii at Manoa"},
    {"course": "maui_courses", "school": "Maui Community College"},
    {"course": "windward_courses", "school": "Windward Community College"},
    {"course": "west_oahu_courses", "school": "University of Hawaii - West Oahu"},
    {"course": "pcatt_course", "school": "PCATT (UH Technology Training Center)"},
]

for school in school_tables:
    print(f"\nProcessing {school['school']}...")
    offset = 0
    FETCH_BATCH = 500

    while True:
        # Fetch batch of courses
        response = supabase.table(school["course"]).select("*").range(offset, offset + FETCH_BATCH - 1).execute()
        courses = response.data
        if not courses:
            break
        print(f"  Fetched {len(courses)} courses (offset {offset})")

        # Bulk fetch existing embeddings for these courses
        course_ids = [c["id"] for c in courses]
        existing_docs_resp = supabase.table("documents").select("course_id", "embedding").in_("course_id", course_ids).execute()
        existing_docs_map = {doc["course_id"]: doc.get("embedding") for doc in existing_docs_resp.data or []}

        # Prepare rows that need embeddings
        rows_to_process = []
        for course in courses:
            if existing_docs_map.get(course["id"]) is None:
                title = str(course.get("course_title") or "")
                desc = str(course.get("course_desc") or "")
                data = str(course.get("data") or "")

                content_text = (
                    f"{course['course_prefix']} {course['course_number']}: {title}\n"
                    f"Description: {desc}\n"
                    f"Credits: {course['num_units']}, Department: {course['dept_name']}\n"
                    f"Info: {data}"
                )

                metadata = {
                    "school": school["school"],
                    "prefix": course['course_prefix'],
                    "number": course['course_number'],
                    "title": title,
                    "num_units": course['num_units'],
                    "department": course['dept_name'],
                    "ipeds": course['inst_ipeds'],
                    "info": data
                }

                rows_to_process.append({
                    "course_id": course["id"],
                    "content": content_text,
                    "metadata": metadata
                })

        # Process in batches
        for i in range(0, len(rows_to_process), BATCH_SIZE):
            batch = rows_to_process[i:i + BATCH_SIZE]
            batch_texts = [item["content"] for item in batch]

            if not batch_texts:
                continue

            retries = 0
            while retries < MAX_RETRIES:
                try:
                    print(f"  Embedding batch of {len(batch_texts)} courses (attempt {retries+1})...")
                    vectors = embeddings.embed_documents(batch_texts, output_dimensionality=1536)

                    for j, vec in enumerate(vectors):
                        batch[j]["embedding"] = vec

                    # Upsert into Supabase
                    print("  Inserting batch into Supabase...")
                    supabase.table("documents").upsert(batch, on_conflict="course_id").execute()
                    break  # success

                except Exception as e:
                    retries += 1
                    print(f"  !! ERROR processing batch (attempt {retries}): {e}")
                    time.sleep(2)

            time.sleep(DELAY_BETWEEN_BATCHES)

        offset += FETCH_BATCH
        print(f"  Finished offset {offset} for {school['school']}")

print("\nAll new and missing embeddings processed!")
