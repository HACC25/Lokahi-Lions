// const API_URL = "http://127.0.0.1:5000/api";
const API_URL = "https://lokahi-lions.onrender.com/api";

export async function signupUser(email, password) {
  const response = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
}

export async function loginUser(email, password) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
}

// Send a request to generate AI educational paths
export async function aipaths(userInterests = []) {
  try {
    const response = await fetch(`${API_URL}/ai-paths`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ interests: userInterests }),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }
    const data = await response.json();
    return data; // This should be the array of educational paths
  } catch (err) {
    console.error("Failed to fetch AI paths:", err);
    return [];
  }
}

export async function sendChatMessage(message) {
  try {
    const response = await fetch(`${API_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    return response.json(); // { response: "... AI reply ..." }
  } catch (err) {
    console.error("Chat request failed:", err);
    return { error: "Chat request failed" };
  }
}