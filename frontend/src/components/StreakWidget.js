import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../api/config";

function StreakWidget() {
  const [streak, setStreak] = useState(0);
  const [completedToday, setCompletedToday] = useState(false);

  const token = localStorage.getItem("token");

  const getStreak = async () => {
    const response = await axios.get(
      `${API_URL}/api/analytics/streak/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setStreak(response.data.current_streak);
    setCompletedToday(response.data.completed_today);
  };

  useEffect(() => {
    getStreak();
  }, []);

  return (
    <div>
      <h3>Focus Streak</h3>

      <h1>🔥 {streak} day{streak === 1 ? "" : "s"}</h1>

      <p>
        {completedToday
          ? "You completed a focus session today! Keep going!"
          : "Complete a focus session today to start your streak."}
      </p>
    </div>
  );
}

export default StreakWidget;