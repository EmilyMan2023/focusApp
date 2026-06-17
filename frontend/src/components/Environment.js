import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import StopCircleIcon from '@mui/icons-material/StopCircle';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';

function Environment({
  changeBackground,
  playSound,
  stopSound,
  volume,
  changeVolume,
  background,
  selectedSound,
}) {
  return (
    <div>
      <h4>Background</h4>
      <Button
        variant={background === "forest" ? "contained" : "outlined"}
        onClick={() => changeBackground("forest")}
      >
        Forest
      </Button>

      <Button
        variant={background === "library" ? "contained" : "outlined"}
        onClick={() => changeBackground("library")}
      >
        Library
      </Button>

    <Button
      variant={background === "beach" ? "contained" : "outlined"}
      onClick={() => changeBackground("beach")}
    >
      Beach
    </Button>

    <Button
        variant={background === "city" ? "contained" : "outlined"}
        onClick={() => changeBackground("city")}
      >
        City
      </Button>

      <h4>Sounds</h4>

      <Button
        variant={selectedSound === "lofi" ? "contained" : "outlined"}
        onClick={() => playSound("lofi")}
      >
        Lofi
      </Button>
      <Button
        variant={selectedSound === "rain" ? "contained" : "outlined"}
        onClick={() => playSound("rain")}
      >
        Rain
      </Button>
      <Button
        variant={selectedSound === "nature" ? "contained" : "outlined"}
        onClick={() => playSound("nature")}
      >
        Nature
      </Button>
            <Button
        variant={selectedSound === "cafe" ? "contained" : "outlined"}
        onClick={() => playSound("cafe")}
      >
        Cafe
      </Button>
      
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