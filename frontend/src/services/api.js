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

export async function chatbot(prompt, interests) {
  const response = await fetch(`${API_URL}/chatbot`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, interests }),
  });
  return response.json();
}