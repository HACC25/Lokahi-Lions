import { useState } from "react";
import { signupUser } from "../services/api";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await signupUser(email, password);
      setMessage(data.message);
    } catch (err) {
      console.error(err);
      setMessage("An error occurred");
    }
  };

  return (
    <div className="col-md-6 offset-md-3">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
        <p>{message}</p>
      </form>
    </div>
  );
}