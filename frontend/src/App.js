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

import { useEffect, useState } from "react";
import { getTest } from "./api/apiFunctions";

function App() {
  const [message, setMessage] = useState("loading...");

  useEffect( () => {
    const t = async () => {
      const a = await getTest();
      setMessage(a.data.message)
      console.log(a)
    }
    t()
    
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Test Page</h1>
      <p>Message: {message}</p>
    </div>
  );
}

export default App;