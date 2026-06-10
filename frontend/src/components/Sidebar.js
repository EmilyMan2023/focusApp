import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import LandscapeIcon from '@mui/icons-material/Landscape';
import ChecklistIcon from '@mui/icons-material/Checklist';
import TimerIcon from '@mui/icons-material/Timer';
import ExtensionIcon from '@mui/icons-material/Extension';

function Sidebar({ openWidget }) {
  return (
    <Box
      sx={{
        width: 90,
        height: "100vh",
        backgroundColor: "#1e1e1e",
        color: "white",
        position: "fixed",
        left: 0,
        top: 0,
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
    <Button variant="contained" onClick={() => openWidget("environment")}>
      <LandscapeIcon />
    </Button>
      <Button variant="contained" onClick={() => openWidget("tasks")}>
        <ChecklistIcon />
      </Button>

      <Button variant="contained" onClick={() => openWidget("timer")}>
        <TimerIcon />
      </Button>
    <Button variant="contained" onClick={() => openWidget("wordle")}>
      <ExtensionIcon />
    </Button>
    </Box>
  );
}

export default Sidebar;