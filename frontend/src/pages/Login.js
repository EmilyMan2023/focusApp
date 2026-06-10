import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();
  console.log("Login clicked");

  try {
    const response = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password,
    });

    console.log("Login response:", response.data);

    localStorage.setItem("token", response.data.access_token);
    localStorage.setItem("user", JSON.stringify(response.data.user));

    setToken(response.data.access_token);

    navigate("/dashboard");
  } catch (error) {
    console.error("Login error:", error);

    if (error.response) {
      alert(error.response.data.message);
    } else {
      alert("Could not connect to backend");
    }
  }
};

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>

      <p>
        No account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;