import { useState } from "react";
import { loginUser } from "../services/api";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    const result = await loginUser(email, password);
    setMessage(result.message || "Login attempt finished.");
  }

  return (
    <div className="col-md-6 offset-md-3">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          className="form-control mb-3"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className="form-control mb-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button className="btn btn-primary w-100">Login</button>
      </form>
      {message && <p className="mt-3 text-muted">{message}</p>}
    </div>
  );
}