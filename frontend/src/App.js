// import React, { useEffect, useState } from "react";
// import './App.css';
// import BasicTabs from "./components/navbar.js";
// import PomodoroTimer from './components/pomodorotimer.js';
// import Box from "@mui/material/Box";
// import Sidebar from "./components/navbar.js";
// import Widget from "./components/widget.js";

// function App() {
//     const [message, setMessage] = useState("");

//     useEffect(() => {
//       fetch("http://localhost:5000/api/test")
//         .then((response) => response.json())
//         .then((data) => {
//           setMessage(data.message);
//         });
//     }, []);


//   const [timerMinutes, setTimerMinutes] = useState(25);
//     // add new widget
//   const [widgets, setWidgets] = useState([]);

//   const addWidget = (type) => {
//   setWidgets((prev) => {

//     // check if widget already exists
//     const alreadyExists = prev.some(
//       (widget) => widget.type === type
//     );

//     // if it exists, do nothing
//     if (alreadyExists) {
//       return prev;
//     }

//     // otherwise create new widget
//     return [
//       ...prev,
//       {
//         id: Date.now(),
//         type,
//         x: 200,
//         y: 100,
//       },
//     ];
//   });
// };

//   return (
//     <Box sx={{ height: "100vh", position: "relative" }}>

//       <Sidebar addWidget={addWidget} />

//       {/* widget canvas */}
//       <Box sx={{ marginLeft: 25 }}>

//         {widgets.map((w) => (
//           <Widget
//             key={w.id}
//             widget={w}
//           />
//         ))}

//       </Box>
//     <div>
//        <p>Message: {message || "Loading..."}</p>
//     </div>
//     </Box>
    
//   );
// }

// export default App;

// import { useEffect, useState } from "react";
// import { getTest } from "./api/apiFunctions";
// import axios from "axios";

// function App() {
//   const [message, setMessage] = useState("loading...");

//   const user = JSON.parse(
//   localStorage.getItem("user") || "null"
//   );

//   useEffect( () => {
//     const t = async () => {
//       const a = await getTest();
//       setMessage(a.data.message)
//       console.log(a)
//     }
//     t()
    
//   }, []);

//   const testRegister = async () => {
//   try {
//     const response = await axios.post(
//       "http://localhost:5000/api/auth/register",
//       {
//         display_name: "Emily",
//         email: "emily@test.com",
//         password: "password123",
//       }
//     );

//     console.log(response.data);
//   } catch (error) {
//     console.error(error);
//   }
// };

// const testLogin = async () => {
//   try {
//     const response = await axios.post(
//       "http://localhost:5000/api/auth/login",
//       {
//         email: "emily@test.com",
//         password: "password123",
//       }
//     );

//     console.log(response.data);

//     localStorage.setItem("token", response.data.access_token);
//     localStorage.setItem(
//   "user",
//   JSON.stringify(response.data.user)
// );
//   } catch (error) {
//     console.error(error.response.data);
//   }
// };

//   return (
//     <div style={{ padding: 20 }}>
//       <h1>Test Page</h1>
//       <p>Message: {message}</p>

//       <button onClick={testRegister}>
//         Test Register
//       </button>
//       <button onClick={testLogin}>
//         Test Login
//       </button>
//       <h1>
//         Hello {user ? user.display_name : "Guest"}
//       </h1>
//     </div>
    
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { useState } from "react";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={token ? <Dashboard setToken={setToken} /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;

