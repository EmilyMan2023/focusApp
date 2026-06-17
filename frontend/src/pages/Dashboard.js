import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";

import Sidebar from "../components/Sidebar";
import Widget from "../components/Widget";
import TaskList from "../components/TaskList";
import PomodoroTimer from "../components/PomodoroTimer";
import Environment from "../components/Environment";
import Wordle from "../components/Wordle";
import StreakWidget from "../components/StreakWidget";

import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Avatar from "@mui/material/Avatar";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import lofiBeat from "../assets/sounds/lofi.mp3";
import rain from "../assets/sounds/rain.mp3";
import nature from "../assets/sounds/nature.mp3";
import cafe from "../assets/sounds/cafe.mp3";

import forestImage from "../assets/backgrounds/forest.jpg";
import libraryImage from "../assets/backgrounds/library.jpg";
import beachImage from "../assets/backgrounds/beach.jpg";
import cityImage from "../assets/backgrounds/city.jpg";

import axios from "axios";
import { API_URL } from "../api/config";

  const defaultWidgets = [
      {
        id: 1,
        type: "environment",
        title: "Background & Sounds",
        x: 160,
        y: 90,
        width: 360,
        height: 360,
        zIndex: 1,
      },
      {
        id: 2,
        type: "tasks",
        title: "Tasks",
        x: 560,
        y: 90,
        width: 380,
        height: 340,
        zIndex: 2,
      },
      {
        id: 3,
        type: "timer",
        title: "Pomodoro Timer",
        x: 160,
        y: 480,
        width: 360,
        height: 300,
        zIndex: 3,
      },
      {
        id: 4,
        type: "wordle",
        title: "Daily Puzzle",
        x: 560,
        y: 460,
        width: 380,
        height: 340,
        zIndex: 4,
      },
      {
        id: 5,
        type: "streak",
        title: "Focus Streak",
        x: 980,
        y: 90,
        width: 320,
        height: 260,
        zIndex: 5,
      },
    ];


function Dashboard() {
  const [anchorEl, setAnchorEl] = useState(null);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [widgets, setWidgets] = useState(() => {
    const saved = localStorage.getItem("widgetLayout");
    return saved ? JSON.parse(saved) : defaultWidgets;
  });

  const [highestZ, setHighestZ] = useState(5);
  const [background, setBackground] = useState("default");
  const [volume, setVolume] = useState(50);

  const audioRef = useRef(null);
  const token = localStorage.getItem("token");

  const [selectedSound, setSelectedSound] = useState("");

const [notificationOpen, setNotificationOpen] = useState(false);

  const showAppNotification = () => {
    setNotificationOpen(true);
  };

  const handleMenuOpen = (event) => {
  setAnchorEl(event.currentTarget);
};

const handleMenuClose = () => {
  setAnchorEl(null);
};

  useEffect(() => {
    localStorage.setItem("widgetLayout", JSON.stringify(widgets));
  }, [widgets]);

  const savePreferences = async (updates) => {
    await axios.put(
      `${API_URL}/api/preferences/`,
      updates,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Saving preferences:", updates);
  };

  const getPreferences = async () => {
    const response = await axios.get(
      `${API_URL}/api/preferences/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const prefs = response.data;

    console.log("Loaded preferences:", prefs);

    setBackground(prefs.background || "default");
    setVolume(prefs.sound_volume || 50);
  };

  useEffect(() => {
    getPreferences();
  }, []);

  const changeBackground = async (newBackground) => {
    setBackground(newBackground);

    await savePreferences({
      selected_background: newBackground,
    });
  };

  const playSound = async (soundName) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setSelectedSound(soundName);
    }

    const sounds = {
      lofi: lofiBeat,
      rain: rain,
      nature: nature,
      cafe: cafe
    };

    const audio = new Audio(sounds[soundName]);
    audio.loop = true;
    audio.volume = volume / 100;
    audio.play();

    audioRef.current = audio;

    await savePreferences({
      selected_sound: soundName,
    });
  };

  const stopSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
      setSelectedSound("");
    }
  };

  const changeVolume = async (newVolume) => {
    setVolume(newVolume);

    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }

    await savePreferences({
      sound_volume: newVolume,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };



  const openWidget = (type) => {
    setWidgets((prev) => {
      const existing = prev.find((widget) => widget.type === type);

      if (existing) {
        return prev.map((widget) =>
          widget.type === type
            ? { ...widget, zIndex: highestZ + 1 }
            : widget
        );
      }

      const titles = {
        tasks: "Tasks",
        timer: "Pomodoro Timer",
        environment: "Background & Sounds",
        wordle: "Daily Puzzle",
        streak: "Focus Streak",
      };


      const positions = {
        environment: { x: 160, y: 90 },
        tasks: { x: 560, y: 90 },
        timer: { x: 160, y: 480 },
        wordle: { x: 560, y: 460 },
        streak: { x: 980, y: 90 },
      };
      const widgetSizes = {
        tasks: { width: 380, height: 340 },
        timer: { width: 360, height: 300 },
        environment: { width: 360, height: 360 },
        wordle: { width: 380, height: 300 },
        streak: { width: 320, height: 260 },
      };

      const position = positions[type];
      const size = widgetSizes[type];

      return [
        ...prev,
        {
          id: Date.now(),
          type,
          title: titles[type],
          x: position.x,
          y: position.y,
          width: size.width,
          height: size.height,
          zIndex: highestZ + 1,
        },
      ];
    });

    setHighestZ((prev) => prev + 1);
  };

  const bringToFront = (id) => {
    setHighestZ((prev) => prev + 1);

    setWidgets((prev) =>
      prev.map((widget) =>
        widget.id === id
          ? { ...widget, zIndex: highestZ + 1 }
          : widget
      )
    );
  };

  const updateWidgetPosition = (id, x, y) => {
    setWidgets((prev) =>
      prev.map((widget) =>
        widget.id === id
          ? { ...widget, x, y }
          : widget
      )
    );
  };

  const updateWidgetSize = (id, width, height) => {
    setWidgets((prev) =>
      prev.map((widget) =>
        widget.id === id
          ? { ...widget, width, height }
          : widget
      )
    );
  };

  const closeWidget = (id) => {
    setWidgets((prev) => prev.filter((widget) => widget.id !== id));
  };

  const renderWidgetContent = (type) => {
    if (type === "environment") {
      return (
      <Environment
        changeBackground={changeBackground}
        playSound={playSound}
        stopSound={stopSound}
        volume={volume}
        changeVolume={changeVolume}
        background={background}
        selectedSound={selectedSound}
      />
      );
    }

    if (type === "tasks") return <TaskList />;
    if (type === "timer") {
    return <PomodoroTimer showAppNotification={showAppNotification} />;
  }
    if (type === "wordle") return <Wordle />;
    if (type === "streak") return <StreakWidget />;

    return null;
  };

  const backgroundImages = {
  forest: forestImage,
  library: libraryImage,
  beach: beachImage,
  city: cityImage
};

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",

        backgroundImage: backgroundImages[background]
          ? `url(${backgroundImages[background]})`
          : "none",

        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#D6ECFF",
      }}
    >
<Sidebar openWidget={openWidget} />

      <Box
        sx={{
          marginLeft: "110px",
          height: "100vh",
          p: 1,

          backgroundColor: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(1px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          {/* <h1   style={{
    marginLeft: "90px",
  }}>Hello {user?.display_name || "Guest"}!</h1> */}

    <IconButton 
      onClick={handleMenuOpen}
      sx={{
        backgroundColor: "rgba(255,255,255,0.8)",
        backdropFilter: "blur(10px)",
        width: 56,
        height: 56,
        ml: 150,

        "&:hover": {
          backgroundColor: "rgba(255,255,255,0.95)",
        },
      }}
      
>
  <Avatar>
    {user?.display_name?.charAt(0)}
  </Avatar>
</IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>
              Settings
            </MenuItem>

            <MenuItem
              onClick={() => {
                handleMenuClose();
                logout();
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Box>


        {widgets.map((widget) => (
          <Widget
            key={widget.id}
            widget={widget}
            bringToFront={bringToFront}
            closeWidget={closeWidget}
            updateWidgetPosition={updateWidgetPosition}
            updateWidgetSize={updateWidgetSize}
          >
            {renderWidgetContent(widget.type)}
          </Widget>
        ))}
      </Box>
      <Snackbar
        open={notificationOpen}
        autoHideDuration={6000}
        onClose={() => setNotificationOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          mt: 8,
          mr: 2,
          zIndex: 9999,
        }}
      >
        <Alert
          onClose={() => setNotificationOpen(false)}
          severity="success"
        >
          Great work! Take a short break before your next session.
        </Alert>
      </Snackbar>
      </Box>
    );
}

export default Dashboard;