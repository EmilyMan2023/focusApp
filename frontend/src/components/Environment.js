import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import StopCircleIcon from '@mui/icons-material/StopCircle';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';

function Environment({     changeBackground,
  playSound,
  stopSound,
  volume,
  changeVolume, }) {
  return (
    <div>
      <h4>Background</h4>
      <Button onClick={() => changeBackground("forest")}>
        Forest
      </Button>

      <Button onClick={() => changeBackground("library")}>
        Library
      </Button>

      <h4>Sounds</h4>
      <Button onClick={() => playSound("lofi")}>Lofi</Button>
      <Button onClick={() => playSound("rain")}>Rain</Button>
      
      <h4>Volume</h4>
      
      <Slider
        value={volume}
        min={0}
        max={100}
        onChange={(e, newValue) => changeVolume(newValue)}
        
      />
      <Button onClick={stopSound}><StopCircleIcon/></Button>
    </div>
    
  );
}

export default Environment;