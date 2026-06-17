import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

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
  <Box
    sx={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f4f4f4",
    }}
  >
    <Paper
      elevation={3}
      sx={{
        p: 5,
        width: 400,
        textAlign: "center",
        borderRadius: 3,
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          mb: 1,
        }}
      >
        Welcome to Focusify
      </Typography>

      <Typography
        variant="subtitle1"
        sx={{
          color: "text.secondary",
          mb: 4,
        }}
      >
        A calm workspace to support a full workday
      </Typography>

      <form onSubmit={handleLogin}>
        <TextField
          fullWidth
          label="Email Address"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          fullWidth
          type="password"
          label="Password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          fullWidth
          variant="contained"
          type="submit"
          sx={{
            mt: 2,
            mb: 2,
          }}
        >
          Login
        </Button>
      </form>

      <Typography variant="body2">
        Don't have an account?
      </Typography>

      <Button href="/register">
        Register
      </Button>
    </Paper>
  </Box>
);
}

export default Login;