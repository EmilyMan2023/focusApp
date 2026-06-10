import { useEffect, useState } from "react";
import axios from "axios";

function TaskList(){
    
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");

    const token = localStorage.getItem("token");

    const getTasks = async () => {
    const response = await axios.get("http://localhost:5000/api/tasks/", {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });

    setTasks(response.data);
    };

    const createTask = async (e) => {
    e.preventDefault();

    await axios.post(
        "http://localhost:5000/api/tasks/",
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
    `http://localhost:5000/api/tasks/${task.id}`,
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
    `http://localhost:5000/api/tasks/${taskId}`,
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
      <input
        placeholder="New task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button type="submit">
        Add Task
      </button>
    </form>

    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task)}
          />

          <span
            style={{
              textDecoration: task.completed
                ? "line-through"
                : "none",
              marginLeft: "8px",
              marginRight: "10px",
            }}
          >
            {task.title}
          </span>

          <button onClick={() => deleteTask(task.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  </div>
);
}

export default TaskList;
