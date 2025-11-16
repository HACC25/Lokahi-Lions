// const API_URL = "http://127.0.0.1:5000/api";
const API_URL = "https://lokahi-lions.onrender.com/api";

export async function fetchHello() {
  const response = await fetch(`${API_URL}/hello`);
  return response.json();
}

export async function fetchTime() {
  const response = await fetch(`${API_URL}/time`);
  return response.json();
}

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