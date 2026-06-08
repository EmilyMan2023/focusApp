import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import HomeIcon from '@mui/icons-material/Home';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';



// function CustomTabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
//     </div>
//   );
// }

// CustomTabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`,
//   };
// }

// export default function BasicTabs() {
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//     setDrawerOpen(true); // open drawer when tab clicked
//   };

//   const [drawerOpen, setDrawerOpen] = React.useState(false);

// //   return (
// //     <Box sx={{ width: '10%' }}>
// //       <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
// //         <Tabs orientation="vertical" value={value} onChange={handleChange} aria-label="basic tabs example">
// //           <Tab icon={<HomeIcon />} label="Environment" {...a11yProps(0)} />
// //           <Tab label="Item Two" {...a11yProps(1)} />
// //           <Tab label="Item Three" {...a11yProps(2)} />
// //         </Tabs>
// //       </Box>
// //       <CustomTabPanel value={value} index={0}>
// //         Item One
// //       </CustomTabPanel>
// //       <CustomTabPanel value={value} index={1}>
// //         Item Two
// //       </CustomTabPanel>
// //       <CustomTabPanel value={value} index={2}>
// //         Item Three
// //       </CustomTabPanel>
// //     </Box>
// //   );

  
// // }
//   return (
//     <Box sx={{ display: 'flex' }}>
      
//       {/* LEFT SIDE TABS */}
//       <Tabs
//         orientation="vertical"
//         value={value}
//         onChange={handleChange}
//         sx={{ borderRight: 1, borderColor: 'divider', minWidth: 120 }}
//       >
//         <Tab icon={<HomeIcon />} label="Environment" />
//         <Tab label="Music" />
//         <Tab label="Timer" />
//       </Tabs>

//       {/* RIGHT SIDE DRAWER */}
//       <Drawer
//         anchor="right"
//         open={drawerOpen}
//         onClose={() => setDrawerOpen(false)}
//       >
//         <Box sx={{ width: 300, p: 2 }}>

//           {/* TAB 0 */}
//           {value === 0 && (
//             <Box>
//               <h3>Environment</h3>
//               <Button fullWidth>Change Background</Button>
//               <Button fullWidth>Upload Image</Button>
//             </Box>
//           )}

//           {/* TAB 1 */}
//           {value === 1 && (
//             <Box>
//               <h3>Music</h3>
//               <Button fullWidth>Play Rain</Button>
//               <Button fullWidth>Play Café</Button>
//             </Box>
//           )}

//           {/* TAB 2 */}
//           {value === 2 && (
//             <Box>
//               <h3>Timer</h3>
//               <Button fullWidth>25 min</Button>
//               <Button fullWidth>50 min</Button>
//             </Box>
//           )}

//         </Box>
//       </Drawer>

//     </Box>
//   );
// }

// try 2

export default function Sidebar({ addWidget }) {
  return (
    <Drawer variant="permanent" anchor="left">
      <Box sx={{ width: 200, p: 2 }}>

        <Button
          fullWidth
          onClick={() => addWidget("timer")}
        >
          Pomodoro Timer
        </Button>

        <Button
          fullWidth
          sx={{ mt: 1 }}
          onClick={() => addWidget("music")}
        >
          Music Player
        </Button>

        <Button
          fullWidth
          sx={{ mt: 1 }}
          onClick={() => addWidget("notes")}
        >
          Notes
        </Button>

      </Box>
    </Drawer>
  );
}