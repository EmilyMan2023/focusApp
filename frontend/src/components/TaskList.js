import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import InputBase from '@mui/material/InputBase';
import TextField from "@mui/material/TextField";
import Checkbox from '@mui/material/Checkbox';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { API_URL } from "../api/config";

function TaskList(){
    
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");

    const token = localStorage.getItem("token");

    const getTasks = async () => {
    const response = await axios.get(`${API_URL}/api/tasks/`, {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });

    setTasks(response.data);
    };

    const createTask = async (e) => {
    e.preventDefault();

    await axios.post(
        `${API_URL}/api/tasks/`,
        {
        title,
        description: "",
        },
        {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        }
    );

    setTitle("");
    getTasks();
    };

    useEffect(() => {
    getTasks();
    }, []);

    const toggleTask = async (task) => {
  await axios.patch(
    `${API_URL}/api/tasks/${task.id}`,
    {
      completed: !task.completed,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  getTasks();
};

const deleteTask = async (taskId) => {
  await axios.delete(
    `${API_URL}/api/tasks/${taskId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  getTasks();
};

return (
  <div>
    <form onSubmit={createTask}>
      <TextField
        label="New Task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        size="small"
      />

      <Button type="submit">
        Add Task
      </Button>
    </form>

    <Box>
      {tasks.map((task) => (
        <Box
          key={task.id}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mt: 1,
          }}
        >
          <Checkbox
            checked={task.completed}
            onChange={() => toggleTask(task)}
          />

          <Typography
            sx={{
              textDecoration: task.completed ? "line-through" : "none",
              flexGrow: 1,
            }}
          >
            {task.title}
          </Typography>

          <Button onClick={() => deleteTask(task.id)}>
            Delete
          </Button>
        </Box>
      ))}
    </Box>
  </div>
);
}

export default TaskList;
