import { Rnd } from "react-rnd";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useState } from "react";
import PomodoroTimer from "./pomodorotimer";

export default function Widget({ widget }) {
  const [minimized, setMinimized] = useState(false);

  return (
    <Rnd
      default={{
        x: widget.x,
        y: widget.y,
        width: 300,
        height: 200,
      }}
      bounds="window"
    >
      <Box
        sx={{
          background: "#c5e0cd",
          color: "white",
          borderRadius: 2,
          overflow: "hidden",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >

        {/* HEADER */}
        <Box
          sx={{
            p: 1,
            background: "#333",
            display: "flex",
            justifyContent: "space-between",
            cursor: "move",
          }}
        >
          <span>{widget.type}</span>

          <Button
            size="small"
            onClick={() => setMinimized(!minimized)}
          >
            {minimized ? "Open" : "Min"}
          </Button>
        </Box>

        {/* CONTENT */}
        {!minimized && (
          <Box sx={{ p: 2 }}>
            {widget.type === "timer" && <PomodoroTimer />}
            {widget.type === "music" && <div>🎵 Music Widget</div>}
            {widget.type === "notes" && <div>📝 Notes Widget</div>}
          </Box>
        )}

      </Box>
    </Rnd>
  );
}