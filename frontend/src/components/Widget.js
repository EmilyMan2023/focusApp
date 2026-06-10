import { Rnd } from "react-rnd";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MinimizeIcon from "@mui/icons-material/Minimize";
import CloseIcon from "@mui/icons-material/Close";

function Widget({ widget, bringToFront, closeWidget, children }) {
  const [minimized, setMinimized] = useState(false);

  return (
    <Rnd
    size={{
        width: 360,
        height: minimized ? 45 : 300,
    }}
    minHeight={45}
    minWidth={250}
    default={{
        x: widget.x,
        y: widget.y,
    }}
    bounds="window"
    onMouseDown={() => bringToFront(widget.id)}
    style={{ zIndex: widget.zIndex }}
    >
    <Box
        sx={{
        height: minimized ? "45px" : "100%",
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: 4,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#2c2c2c",
            color: "white",
            p: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "move",
          }}
        >
          <Typography variant="subtitle2">
            {widget.title}
          </Typography>

          <Box>
            <Button size="small" onClick={() => setMinimized(!minimized)}>
              <MinimizeIcon />
            </Button>

            <Button size="small" onClick={() => closeWidget(widget.id)}>
              <CloseIcon />
            </Button>
          </Box>
        </Box>

        {!minimized && (
          <Box sx={{ p: 2, overflow: "auto", flex: 1 }}>
            {children}
          </Box>
        )}
      </Box>
    </Rnd>
  );
}

export default Widget;