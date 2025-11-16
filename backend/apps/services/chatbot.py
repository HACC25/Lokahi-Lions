import os
from dotenv import load_dotenv
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from supabase.client import create_client
import google.generativeai as genai

# Load environment variables
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not all([SUPABASE_URL, SUPABASE_KEY, GEMINI_API_KEY]):
    raise ValueError("Missing environment variables")

# Initialize clients
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
embeddings = GoogleGenerativeAIEmbeddings(
    model="models/gemini-embedding-001",
    google_api_key=GEMINI_API_KEY,
    task_type="retrieval_query"
)
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-2.5-flash-lite')

def search_courses(query: str, top_k: int = 5):
    """Search for relevant courses using semantic similarity"""
    # Generate embedding for the query with 1536 dimensions to match database
    query_embedding = embeddings.embed_query(query, output_dimensionality=1536)
    
    # Perform similarity search in Supabase
    # Convert list to string format that Supabase expects
    embedding_str = '[' + ','.join(map(str, query_embedding)) + ']'
    
    response = supabase.rpc(
        'match_documents',
        {
            'query_embedding': embedding_str,
            'match_count': top_k
        }
    ).execute()
    
    return response.data

def format_context(courses):
    """Format course results into context for the LLM"""
    if not courses:
        return "No relevant courses found."
    
    context_parts = []
    for i, course in enumerate(courses, 1):
        metadata = course.get('metadata', {})
        context_parts.append(
            f"Course {i}:\n"
            f"School: {metadata.get('school', 'N/A')}\n"
            f"Code: {metadata.get('prefix', '')} {metadata.get('number', '')}\n"
            f"Title: {metadata.get('title', 'N/A')}\n"
            f"Credits: {metadata.get('num_units', 'N/A')}\n"
            f"Department: {metadata.get('department', 'N/A')}\n"
            f"Content: {course.get('content', '')}\n"
        )
    
    return "\n---\n".join(context_parts)

def chat(user_query: str):
    """Main chatbot function"""
    print(f"\n🔍 Searching for relevant courses...")
    
    # Search for relevant courses
    relevant_courses = search_courses(user_query, top_k=5)
    
    if not relevant_courses:
        return "I couldn't find any relevant courses in the database. Could you rephrase your question?"
    
    # Format context
    context = format_context(relevant_courses)
    
    # Create prompt for Gemini
    prompt = f"""You are a helpful university course advisor assistant. A student has asked a question about courses.

Based on the following course information from the University of Hawaii system, provide a helpful and accurate response.

STUDENT QUESTION:
{user_query}

RELEVANT COURSES:
{context}

Please provide a clear, conversational response that:
1. Directly answers the student's question
2. References specific courses when relevant
3. Includes course codes, titles, and schools
4. Mentions credit hours if relevant
5. Is friendly and encouraging

Response:"""
    
    # Generate response
    print("💭 Generating response...")
    response = model.generate_content(prompt)
    
    return response.text

def main():
    """Interactive chat loop"""
    print("=" * 60)
    print("🌺 University of Hawaii Course Chatbot")
    print("=" * 60)
    print("Ask me anything about UH courses!")
    print("Type 'quit' or 'exit' to end the conversation.\n")
    
    while True:
        user_input = input("You: ").strip()
        
        if user_input.lower() in ['quit', 'exit', 'q']:
            print("\n👋 Aloha! Have a great day!")
            break
        
        if not user_input:
            continue
        
        try:
            response = chat(user_input)
            print(f"\n🤖 Assistant: {response}\n")
        except Exception as e:
            print(f"\n❌ Error: {e}\n")
            print("Please try rephrasing your question.\n")

if __name__ == "__main__":
    main()
