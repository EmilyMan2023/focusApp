import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import axios from "axios";
import { API_URL } from "../api/config";


export default function PomodoroTimer({ showAppNotification }) {
  const token = localStorage.getItem("token");

  const [inputMinutes, setInputMinutes] = useState(25);
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  const [notificationOpen, setNotificationOpen] = useState(false);

  const startTimer = () => {
    setTime(inputMinutes * 60);
    setIsRunning(true);
  };

  const saveFocusSession = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/api/focus-sessions/`,
        {
          duration_minutes: inputMinutes,
          completed: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Focus session saved:", response.data);
    } catch (error) {
      console.error(
        "Focus session save error:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    let interval;

    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, time]);

  useEffect(() => {
  if (time === 0 && isRunning) {
    setIsRunning(false);
    saveFocusSession();
    showNotification();
    showAppNotification();
  }
  }, [time, isRunning]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const display = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  const showNotification = () => {
  if (!("Notification" in window)) {
    alert("Focus session complete! Time for a break.");
    return;
  }

  if (Notification.permission === "granted") {
    new Notification("Focus session complete!", {
      body: "Time to take a short break.",
    });
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        new Notification("Focus session complete!", {
          body: "Time to take a short break.",
        });
      }
    });
  }
};

  return (
    <Box
      sx={{
        color: "black",
        padding: 3,
        borderRadius: 2,
        minWidth: 220,
        textAlign: "center",
      }}
    >
      <Typography variant="h3">{display}</Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          mt: 2,
        }}
      >
        <RemoveIcon
          onClick={() => setInputMinutes((prev) => Math.max(1, prev - 1))}
        />

        <Typography variant="h6">{inputMinutes} min</Typography>

        <AddIcon
          onClick={() => setInputMinutes((prev) => Math.max(1, prev + 1))}
        />
      </Box>

      <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
        <Button variant="contained" onClick={startTimer} disabled={isRunning}>
          Start
        </Button>

        <Button variant="outlined" onClick={() => setIsRunning(false)}>
          Pause
        </Button>

        <Button
          variant="outlined"
          onClick={() => {
            setIsRunning(false);
            setTime(inputMinutes * 60);
          }}
        >
          Reset
        </Button>
      </Box>
    </Box>
  );
}