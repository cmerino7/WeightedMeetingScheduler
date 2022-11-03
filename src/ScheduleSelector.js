import React from "react";
import "./ScheduleSelector.css";
import ScheduleSelector from "react-schedule-selector";

class Appp extends React.Component {
  state = { schedule: [] };

  handleChange = (newSchedule) => {
    this.setState({ schedule: newSchedule });
  };

  render() {
    return (
      <div className="Appp">
       
        <ScheduleSelector
          selection={this.state.schedule}
          numDays={5}
          minTime={8}
          maxTime={17}
          hourlyChunks={1}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default Appp;

