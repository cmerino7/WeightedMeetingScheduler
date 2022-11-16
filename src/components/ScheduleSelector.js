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


import { Button } from "@mui/material";

class Appp extends React.Component {
    // state = { schedule: [] };
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            id: 10,
        }
    }
    handleChange = (newSchedule) => { //this function should send data to backend
        this.setState({ schedule: newSchedule }); // newSchedule is an Array in js date format ex:
        console.log(newSchedule)                  //  [ Date Mon Nov 14 2022 15:00:00 GMT-0800 (Pacific Standard Time), ]
    };

    myClick(date) {
        const newStartDate = new Date()
        newStartDate.setHours(date.getHours() - 1)
        newStartDate.setMinutes(0)
        newStartDate.setDate(date.getDate())

        const newEndDate = new Date()
        newEndDate.setHours(date.getHours())
        newEndDate.setMinutes(0)
        newEndDate.setDate(date.getDate())

        // console.log(newStartDate)
        // console.log(newEndDate)

        const table = this.state.events
        const title = "Event " + this.state.id
        table.push({
            event_id: this.state.id,
            title: title,
            start: newStartDate,
            end: newEndDate,
            color: "#ff0000",

        })

        this.setState({
            events: table,
            id: this.state.id + 1,
        })
    };

    render() {
        return (
            <div className="Appp">
            <Scheduler
            events={this.state.events}
            view="week"
            day={null}
            month={null}
            week={{
                weekDays: [0, 1, 2, 3, 4, 5],
                    weekStartOn: 6,
                    startHour: 9,
                    endHour: 17,
                    step: 60,
                    cellRenderer: ({ height, start, onClick, ...props }) => {
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
                            onClick={(e) => {
                                const ex = new Date(e.target.getAttribute("end"));
                                this.myClick(ex);

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

