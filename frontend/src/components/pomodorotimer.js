import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function PomodoroTimer() {
  // user input (minutes)
  const [inputMinutes, setInputMinutes] = useState(25);

  // actual countdown (seconds)
  const [time, setTime] = useState(25 * 60);

  const [isRunning, setIsRunning] = useState(false);

  // start timer using user input
  const startTimer = () => {
    setTime(inputMinutes * 60);
    setIsRunning(true);
  };

  // countdown logic
  useEffect(() => {
    let interval;

    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, time]);

  // format time
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const display = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  return (
    <Box
      sx={{
        color: "white",
        padding: 3,
        borderRadius: 2,
        minWidth: 220,
        textAlign: "center",
      }}
    >
      {/* TIMER DISPLAY */}
      <Typography variant="h3">
        {display}
      </Typography>

      {/* INPUT */}
    <Box
    sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        mt: 2,
    }}
    >
    {/* decrease */}
    <RemoveIcon      
        onClick={() =>
        setInputMinutes((prev) => Math.max(1, prev - 1))
        }
    />

    {/* display value */}
    <Typography variant="h6">
        {inputMinutes} min
    </Typography>

    {/* increase */}
    <AddIcon      
        onClick={() =>
        setInputMinutes((prev) => Math.max(1, prev + 1))
        }
    />
    </Box>

      {/* CONTROLS */}
      <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
        <Button variant="contained" onClick={startTimer}>
          Start
        </Button>

        <Button
          variant="outlined"
          onClick={() => setIsRunning(false)}
        >
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