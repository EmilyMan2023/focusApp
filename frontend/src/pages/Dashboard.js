import { useState } from "react";
import Box from "@mui/material/Box";

import Sidebar from "../components/Sidebar";
import Widget from "../components/Widget";
import TaskList from "../components/TaskList";
import PomodoroTimer from "../components/PomodoroTimer";
import Environment from "../components/Environment";
import Wordle from "../components/Wordle";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [widgets, setWidgets] = useState([]);
  const [highestZ, setHighestZ] = useState(1);

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
    timer: { x: 150, y: 430 },
    wordle: { x: 550, y: 430 },
    };
    const position = positions[type];
      return [
        ...prev,

    {
    id: Date.now(),
    type,
    title: titles[type],
    x: position.x,
    y: position.y,
    zIndex: highestZ + 1,
    }
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

  const closeWidget = (id) => {
    setWidgets((prev) => prev.filter((widget) => widget.id !== id));
  };

  const renderWidgetContent = (type) => {
    if (type === "environment") return <Environment />;
    if (type === "tasks") return <TaskList />;
    if (type === "timer") return <PomodoroTimer />;
    if (type === "wordle") return <Wordle />;
    return null;
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f4f4f4" }}>
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
          >
            {renderWidgetContent(widget.type)}
          </Widget>
        ))}
      </Box>
    </Box>
  );
}

export default Dashboard;