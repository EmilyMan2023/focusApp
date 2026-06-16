import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";

import Sidebar from "../components/Sidebar";
import Widget from "../components/Widget";
import TaskList from "../components/TaskList";
import PomodoroTimer from "../components/PomodoroTimer";
import Environment from "../components/Environment";
import Wordle from "../components/Wordle";

import lofiBeat from "../assets/sounds/lofi.mp3";
import rain from "../assets/sounds/rainy.mp3";

import axios from "axios";

const defaultWidgets = [
  {
    id: 1,
    type: "tasks",
    title: "Tasks",
    x: 550,
    y: 100,
    width: 420,
    height: 420,
    zIndex: 1,
  },
  {
    id: 2,
    type: "timer",
    title: "Pomodoro Timer",
    x: 150,
    y: 430,
    width: 360,
    height: 300,
    zIndex: 2,
  },
  {
    id: 3,
    type: "environment",
    title: "Background & Sounds",
    x: 150,
    y: 100,
    width: 420,
    height: 360,
    zIndex: 3,
  },
  {
    id: 4,
    type: "wordle",
    title: "Daily Puzzle",
    x: 550,
    y: 430,
    width: 380,
    height: 420,
    zIndex: 4,
  },
];

function Dashboard() {
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

  useEffect(() => {
    localStorage.setItem("widgetLayout", JSON.stringify(widgets));
  }, [widgets]);

  const savePreferences = async (updates) => {
    await axios.put(
      "http://localhost:5000/api/preferences/",
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
      "http://localhost:5000/api/preferences/",
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
    }

    const sounds = {
      lofi: lofiBeat,
      rain: rain,
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
      };

      const positions = {
        environment: { x: 150, y: 100 },
        tasks: { x: 550, y: 100 },
        timer: { x: 150, y: 450 },
        wordle: { x: 550, y: 450 },
      };

      const widgetSizes = {
        tasks: { width: 360, height: 340 },
        timer: { width: 360, height: 300 },
        environment: { width: 360, height: 360 },
        wordle: { width: 380, height: 380 },
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
        />
      );
    }

    if (type === "tasks") return <TaskList />;
    if (type === "timer") return <PomodoroTimer />;
    if (type === "wordle") return <Wordle />;

    return null;
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        backgroundColor:
          background === "forest"
            ? "#dff3e3"
            : background === "library"
            ? "#efe3d0"
            : background === "city"
            ? "#dfe7f3"
            : "#f4f4f4",
      }}
    >
      <Sidebar openWidget={openWidget} />

      <Box sx={{ marginLeft: "110px", p: 3 }}>
        <h1>Hello {user?.display_name || "Guest"}</h1>

        <button onClick={logout}>
          Logout
        </button>

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
    </Box>
  );
}

export default Dashboard;