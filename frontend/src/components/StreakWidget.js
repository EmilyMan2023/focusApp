import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../api/config";

function StreakWidget() {
  const [streak, setStreak] = useState(0);
  const [completedToday, setCompletedToday] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const getStreak = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/analytics/streak`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStreak(response.data.current_streak || 0);
      setCompletedToday(response.data.completed_today || false);
      setError("");
    } catch (error) {
      console.error(
        "Streak error:",
        error.response?.data || error.message
      );

      setStreak(0);
      setCompletedToday(false);
      setError("Unable to load streak right now.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStreak();
  }, []);

  if (loading) {
    return (
      <div>
        <h3>Focus Streak</h3>
        <p>Loading streak...</p>
      </div>
    );
  }

  return (
    <div>
      <h3>Focus Streak</h3>

      <h1>
        🔥 {streak} day{streak === 1 ? "" : "s"}
      </h1>

      {error && <p>{error}</p>}

      {!error && (
        <p>
          {completedToday
            ? "You completed a focus session today! Keep going!"
            : "Complete a focus session today to start your streak."}
        </p>
      )}
    </div>
  );
}

export default StreakWidget;