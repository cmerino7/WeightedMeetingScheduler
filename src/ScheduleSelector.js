// import * as React from 'react';
// import * as ReactDOM from 'react-dom';
// import { ScheduleComponent, WorkWeek, Week, Month, Inject, ViewsDirective, ViewDirective } from '@syncfusion/ej2-react-schedule';
// import { defaultData } from './datasource';
// import { extend } from '@syncfusion/ej2-base';

// function Appp() {
//     const data = extend([], defaultData, null, true);
//     return (<ScheduleComponent width='100%' height='550px' selectedDate={new Date(2018, 1, 15)} eventSettings={{ dataSource: data }}>
//   <ViewsDirective>
//     <ViewDirective option='WorkWeek' startHour='10:00' endHour='18:00'/>
//     <ViewDirective option='Week' startHour='07:00' endHour='15:00'/>
//     <ViewDirective option='Month' showWeekend={false}/>
//   </ViewsDirective>
//   <Inject services={[WorkWeek, Week, Month]}/>
// </ScheduleComponent>);
// }
// const root = ReactDOM.createRoot(document.getElementById('schedule'));
// //root.render(<Appp />);
// export default Appp;

import React from "react";
import "./ScheduleSelector.css";
import ScheduleSelector from "react-schedule-selector";
import { Scheduler } from "@aldabil/react-scheduler";
import { red } from "@mui/material/colors";


import { EVENTS } from "./events";
import { Button } from "@mui/material";

class Appp extends React.Component {
  state = { schedule: [] };

  handleChange = (newSchedule) => { //this function should send data to backend
    this.setState({ schedule: newSchedule }); // newSchedule is an Array in js date format ex:
    console.log(newSchedule)                  //  [ Date Mon Nov 14 2022 15:00:00 GMT-0800 (Pacific Standard Time), ]            
  };

  render() {
    return (
      <div className="Appp">
      <Scheduler
      events={EVENTS}
      view="week"
      day={null}
      month={null}
      week={{
        weekDays: [0, 1, 2, 3, 4, 5],
        weekStartOn: 6,
        startHour: 9,
        endHour: 17,
        step: 60,
        cellRenderer: ({ height, start,  ...props }) => {
          // Fake some condition up
          const hour = start.getHours();
          const disabled = hour === 14;
          const restProps = disabled ? {} : props;
          return (
            <Button
              style={{
                height: "100%",
                background: disabled ? "#eee" : "transparent",
                cursor: disabled ? "not-allowed" : "pointer"
              }}
              onClick={() => {
                if (disabled) {
                  return alert("GET FUCKED");
                }
                // onClick();
              }}
              disableRipple={disabled}
              // disabled={disabled}
              {...restProps}
            ></Button>
          );
        }
      }}
    />
        {/* <ScheduleSelector
          selection={this.state.schedule}
          numDays={5}
          minTime={8}
          maxTime={17}
          timeFormat={"hh:mm A"}
          dateFormat={"ddd"}
          // startdate ={"monday"}
          hourlyChunks={1}
          //renderDateCell = {(datetime: Date, selected: boolean, refSetter: (dateCell: HTMLElement | null) => void) => Appp}
          // description: A render prop function that accepts the time this cell is representing and whether the cell is selected or not and 
          // should return a React element. It is your responsibility to apply the refSetter as a ref to the component you render -- neglecting to do so 
          // will cause the component to not work properly for touch devices. If you choose to use this custom render function, 
          // the color props above have no effect.
          onChange={this.handleChange} //send data to backend, see function
        /> */}
      </div>
    );
  }
}

export default Appp;

