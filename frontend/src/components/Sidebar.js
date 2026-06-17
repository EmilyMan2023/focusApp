import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import LandscapeIcon from '@mui/icons-material/Landscape';
import ChecklistIcon from '@mui/icons-material/Checklist';
import TimerIcon from '@mui/icons-material/Timer';
import ExtensionIcon from '@mui/icons-material/Extension';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

function Sidebar({ openWidget }) {
  return (
    <Box
      sx={{
        width: 80,
        height: "100vh",
        backgroundColor: "rgba(255,255,255,0.15)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
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
    <Button sx={{ mt: 5, height: 60, borderRadius: 3 }}variant="contained" onClick={() => openWidget("environment")}>
      <LandscapeIcon />
    </Button>
      <Button sx={{ height:60, borderRadius: 3 }} variant="contained" onClick={() => openWidget("tasks")}>
        <ChecklistIcon />
      </Button>

      <Button sx={{ height:60, borderRadius: 3 }} variant="contained" onClick={() => openWidget("timer")}>
        <TimerIcon />
      </Button>
    <Button sx={{ height:60, borderRadius: 3 }} variant="contained" onClick={() => openWidget("wordle")}>
      <ExtensionIcon />
    </Button>
    <Button sx={{ height:60, borderRadius: 3 }} variant="contained" onClick={() => openWidget("streak")}>
      <LocalFireDepartmentIcon/>
    </Button>
    </Box>
  );
}

export default Sidebar;