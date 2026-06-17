import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { API_URL } from "../api/config";

import background from "../assets/backgrounds/background.jpg";

function Register() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    await axios.post(`${API_URL}/api/auth/register/`, {
      display_name: displayName,
      email,
      password,
    });

    navigate("/login");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
    <Paper
      elevation={3}
      sx={{
        p: 5,
        width: 400,
        textAlign: "center",
        backgroundColor: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(10px)",
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
        Register
      </Typography>


      <form onSubmit={handleRegister}>
        <TextField
          fullWidth
          label="Display Name"
          margin="normal"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />

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
          Register
        </Button>
      </form>

      <Typography variant="body2">
        Already have an account?
      </Typography>

      <Button href="/login">
        Login
      </Button>
    </Paper>
  </Box>
  );
}

export default Register;


