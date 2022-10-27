import ReactSlider from "react-slider";
import { useState } from "react";
    
const Slider = () => {
    const [currentValue, setCurrentValue] = useState(0);
    return (
        <ReactSlider
        className="customSlider"
        trackClassName="customSlider-track"
        thumbClassName="customSlider-thumb"
        markClassName="customSlider-mark"
        getAriaValueText={currentValue}
        valueLabelDisplay="auto"
        step={20}
        marks={20}
        min={0}
        max={100}
        defaultValue={0}
        value={currentValue}
        onChange={(value) => setCurrentValue(value)}
        renderMark={(props) => {
            if (props.key < currentValue) {
            props.className = "customSlider-mark customSlider-mark-before";
            } else if (props.key === currentValue) {
            props.className = "customSlider-mark customSlider-mark-active";
            }
            return <span {...props} />;
            }}
        
        />
    );
  };

export default Slider;