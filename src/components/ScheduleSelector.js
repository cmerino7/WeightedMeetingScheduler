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


//import { EVENTS } from "./events";
import { Button } from "@mui/material";

class Appp extends React.Component {
    // state = { schedule: [] };
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            //id: 10,
            id: [],

            count: 20,
            countid: 0,
        }
    }
    // handleChange = (newSchedule) => { //this function should send data to backend
    //     this.setState({ schedule: newSchedule }); // newSchedule is an Array in js date format ex:
    //     console.log(newSchedule)                  //  [ Date Mon Nov 14 2022 15:00:00 GMT-0800 (Pacific Standard Time), ]
    // };

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

        // var colorScheme1;
        // var colorScheme2;
        // var colorScheme3;
        // var colorScheme4;
        // var colorScheme5;
        // var colorSchemeval;
        // while(true){
        //     colorSchemeval = prompt("select color scheme (1: red-green; 2: green-blue; 3: blue-green");
        //     if(colorSchemeval == "1"){
        //         colorScheme1 = "#a83232"
        //         colorScheme2 = "#f20000"
        //         colorScheme3= "#dbb60d"
        //         colorScheme4 = "#8fdb0d"
        //         colorScheme5 = "#1dad20"
        //         break;

        //     }
        //     else if(colorSchemeval == "2"){
        //         colorScheme1 = "#05ff0a"
        //         colorScheme2 = "#15b319"
        //         colorScheme3= "#15b389"
        //         colorScheme4 = "#15a3b3"
        //         colorScheme5 = "#156cb3"
        //         break;

        //     }
        //     else if(colorSchemeval == "3"){
        //         colorScheme1 = "#008cff"
        //         colorScheme2 = "#1b70b5"
        //         colorScheme3= "#65bb52"
        //         colorScheme4 = "#7fb51b"
        //         colorScheme5 = "#ad4545"
        //         break;

        //     }
        //     else{
        //         window.alert("error try again!!?!")
        //     }
        // }

        //get color input
        //var colorNum = prompt("Enter number from 1-5");
        var colorNum;
        var colorsel;
        while(true){
            colorNum = prompt("Enter number from 1-5");
            if(colorNum == "5"){
                colorsel = "#7ae862ff"
                //colorsel = colorScheme5
                break;
            }
            else if(colorNum =="4"){
                colorsel = "#b3e862ff"
                //colorsel = colorScheme4
                break;
            }
            else if(colorNum =="3"){
                colorsel = "#dae862ff"
                //colorsel = colorScheme3
                break;
            }
            else if(colorNum =="2"){
                colorsel = "#e8d562ff"
                //colorsel = colorScheme2
                break;
            }
            else if(colorNum =="1"){
                colorsel = "#e8b862ff"
                //colorsel = colorScheme1
                break;
            }
            else{
                window.alert("error try again!!")
            }
        }



        const table = this.state.events
        //const title = "Event " + this.state.id
        const title = "Event " + this.state.countid
        this.state.id.push(this.state.count)
        table.push({
            //event_id: this.state.id,
            event_id: this.state.count,
            title: title,
            start: newStartDate,
            end: newEndDate,
            //color: "#ff0000",
            color:colorsel,

        })

        this.setState({
            events: table,
            //id: this.state.id + 1,
            id: this.state.id,
            count: this.state.count + 1,
            countid:this.state.countid+1,
        })
    };

    delEvent(id) {

        var index = this.state.id.indexOf(id)

        this.state.id.splice(index, 1)
        this.state.events.splice(index, 1)

        this.setState({
            events: this.state.events,
            //id: this.state.id + 1,
            id: this.state.id,
            count: this.state.count,
            countid:this.state.countid,
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
            onDelete={(id) => this.delEvent(id)}
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

