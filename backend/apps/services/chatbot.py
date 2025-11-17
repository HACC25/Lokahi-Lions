import os
from dotenv import load_dotenv
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from supabase.client import create_client

# Load environment variables
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not all([SUPABASE_URL, SUPABASE_KEY, GEMINI_API_KEY]):
    raise ValueError("Missing environment variables")

# Initialize clients
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# Initialize embeddings client using LangChain's wrapper
embeddings_client = GoogleGenerativeAIEmbeddings(
    model="gemini-embedding-001",
    google_api_key=GEMINI_API_KEY
)

# Use ChatGoogleGenerativeAI for chat (better integration with LangChain)
chat_model = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash-lite",
    google_api_key=GEMINI_API_KEY,
    temperature=0.5
)
# Conversation history storage
conversation_history = []

def search_courses(query: str, top_k: int = 5):
    # Generate embedding for the query using LangChain's GoogleGenerativeAIEmbeddings
    # This returns a list of floats matching the embedding stored in Supabase
    query_embedding = embeddings_client.embed_query(
        query,
        output_dimensionality=1536
    )
    
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

def format_conversation_history():
    """Format conversation history for context"""
    if not conversation_history:
        return ""
    
    history_text = "\n\nPREVIOUS CONVERSATION:\n"
    for entry in conversation_history[-6:]:  # Keep last 3 exchanges (6 messages)
        history_text += f"{entry['role'].upper()}: {entry['content']}\n"
    
    return history_text

def chat(user_query: str, user_interests: list = []):
    """Main chatbot function with conversation memory"""
    print(f"\n🔍 Searching for relevant courses...")
    
    # For follow-up questions, we might need context from history
    # Create a query that includes recent context
    enriched_query = user_query
    if conversation_history:
        # Get last user question and assistant response for context
        recent_context = ""
        for entry in conversation_history[-4:]:
            if entry['role'] == 'user':
                recent_context += f"Previous question: {entry['content'][:100]}... "
        
        if recent_context:
            enriched_query = f"{recent_context} Current question: {user_query}"
    
    # Search for relevant courses using the enriched query
    relevant_courses = search_courses(enriched_query, top_k=5)
    
    if not relevant_courses:
        return "I couldn't find any relevant courses in the database. Could you rephrase your question?"
    
    # Format context
    context = format_context(relevant_courses)
    
    # Get conversation history
    history = format_conversation_history()
    
    # Create prompt for Gemini with conversation history
    prompt = f"""You are a helpful university course advisor assistant. A student has asked a question about courses and career.
    Based on the following course information from the University of Hawaii system and the previous conversation, provide a helpful and accurate response.
    {history}
    CURRENT STUDENT QUESTION:
    {user_query}
    STUDENT INTERESTS:
    {', '.join(user_interests) if user_interests else 'None'}
    RELEVANT COURSES:
    {context}
    Please provide a clear, conversational response that:
    1. Directly answers the student's question
    2. References specific courses when relevant
    3. Includes course codes, titles, and schools
    4. Mentions credit hours if relevant
    5. Is friendly and encouraging
    6. References previous parts of the conversation when relevant (e.g., "As I mentioned earlier..." or "Building on what we discussed...")
    7. For follow-up questions like "what about...", "tell me more", or "any others?", use context from the conversation history
    8. If their question is unrelated to UH courses or career exploration, politely inform them to try rephrasing.
Response:"""
    
    # Generate response using LangChain's ChatGoogleGenerativeAI
    print("💭 Generating response...")
    response = chat_model.invoke(prompt)
    
    # Store conversation in history
    conversation_history.append({
        'role': 'user',
        'content': user_query
    })
    conversation_history.append({
        'role': 'assistant',
        'content': response.content
    })
    
    return response.content

def reset_conversation():
    """Clear conversation history"""
    global conversation_history
    conversation_history = []
    print("🔄 Conversation history cleared!")

def startChat(initial_prompt: str, user_interests: list = []):
    """Interactive chat loop"""
    print("=" * 60)
    print("🌺 University of Hawaii Course Chatbot")
    print("=" * 60)
    print("Ask me anything about UH courses!")
    print("Type 'quit' or 'exit' to end the conversation.")
    print("Type 'reset' to clear conversation history.\n")
    
    while True:
        if initial_prompt.lower() == 'reset':
            reset_conversation()
            continue
        
        if not initial_prompt:
            continue
        
        try:
            response = chat(initial_prompt, user_interests)
            print(f"\n🤖 Assistant: {response}\n")
        except Exception as e:
            print(f"\n❌ Error: {e}\n")
            print("Please try rephrasing your question.\n")

if __name__ == "__main__":
    prompt = "This is a test message to verify the chatbot is working."
    interests = ["computer science", "data science"]
    startChat(prompt, interests)