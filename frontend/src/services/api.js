const API_URL = "http://localhost:5000/api";

export async function fetchHello() {
  const response = await fetch(`${API_URL}/hello`);
  return response.json();
}

export async function fetchTime() {
  const response = await fetch(`${API_URL}/time`);
  return response.json();
}