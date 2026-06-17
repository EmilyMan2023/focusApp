import { Rnd } from "react-rnd";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MinimizeIcon from "@mui/icons-material/Minimize";
import CloseIcon from "@mui/icons-material/Close";

function Widget({ widget, bringToFront, closeWidget, children, updateWidgetPosition, updateWidgetSize }) {
  const [minimized, setMinimized] = useState(false);

  return (
  <Rnd
    default={{
      x: widget.x,
      y: widget.y,
      width: widget.width || 380,
      height: widget.height || 320,
    }}
    size={
      minimized
        ? { width: widget.width || 380, height: 45 }
        : undefined
    }
    minWidth={280}
    minHeight={45}
    bounds="window"
    onMouseDown={() => bringToFront(widget.id)}
    style={{ zIndex: widget.zIndex }}

    onDragStop={(e, d) => {
  updateWidgetPosition(widget.id, d.x, d.y);
}}
onResizeStop={(e, direction, ref, delta, position) => {
  updateWidgetSize(
    widget.id,
    parseInt(ref.style.width),
    parseInt(ref.style.height)
  );

  updateWidgetPosition(widget.id, position.x, position.y);
}}
  >
    <Box
        sx={{
        height: minimized ? "45px" : "100%",
          backgroundColor: "rgba(255,255,255,1.05)",
          borderRadius: 2,
          boxShadow: 4,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#f5f5f5",
            color: "#333",
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
        <Box
          sx={{
            p: 2,
            overflow: "auto",
            flex: 1,
          }}
        >
          {children}
        </Box>
        )}
      </Box>
    </Rnd>
  );
}

export default Widget;