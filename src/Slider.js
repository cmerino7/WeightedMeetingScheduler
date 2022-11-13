import React from "react";
import ReactSlider from "react-slider";
import { useState } from "react";

//A FUNCTION COMPONENT--STATE HOOK

const Slider = () => {
    const [currentValue, setCurrentValue] = useState(0);
    return (
      <div>
        <ReactSlider
        
        className="customSlider"
        trackClassName="customSlider-track"
        thumbClassName="customSlider-thumb"
        markClassName="customSlider-mark"

        step={20}
        marks={20}
        min={0}
        max={100}
        defaultValue={0}
        value={currentValue}
        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
        onChange={(value) => setCurrentValue(value)}
        //onChange={(value) => sendDataToPart(value)}

        
        />
      </div>
    );
  };


export default Slider;  

