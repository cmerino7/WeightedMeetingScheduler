import React from "react";
import "./ScheduleSelector.css";
import ScheduleSelector from "react-schedule-selector";
import { Scheduler } from "@aldabil/react-scheduler";
import PropTypes from "prop-types";
import { Slider as SliderDHX } from "dhx-suite";
import "dhx-suite/codebase/suite.min.css";

//import { EVENTS } from "./events";
import { Button } from "@mui/material";

class Appp extends React.Component {
    // state = { schedule: [] };
    constructor(props) {
        super(props);
        this.state = {
            event: "",
            val: "",
            events: [],
            //id: 10,
            id: [],
            
            count: 20,
            countid: 0,
        };
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
            colorNum = this.state.val;
            //console.log("cN",colorNum)
            let c = colorNum/100*255;
            //console.log("c",c)
            if(c == "0"){
                colorsel = "#C9C9C9"
                //colorsel = colorScheme5
                break;
            }
            // else if(colorNum =="4"){
            //     colorsel = "#b3e862ff"
            //     //colorsel = colorScheme4
            //     break;
            // }
            // else if(colorNum =="3"){
            //     colorsel = "#dae862ff"
            //     //colorsel = colorScheme3
            //     break;
            // }
            // else if(colorNum =="2"){
            //     colorsel = "#e8d562ff"
            //     //colorsel = colorScheme2
            //     break;
            // }
            // else if(colorNum =="1"){
            //     colorsel = "#e8b862ff"
            //     //colorsel = colorScheme1
            //     break;
            // }
            else{
                colorsel = "rgb("+(255-c)+","+(c)+",0)";
                // window.alert("error try again!!")
                break;
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

    //Slider Component Start
    componentDidMount() {
        this.slider = new SliderDHX(this.el, {
            min: 0,
            max: 100,
            step: 1,
            thumbLabel: true,
            tick: 1,
            majorTick: 10,
            tickTemplate: v => v,
        });

        this.slider.events.on("change", val => this.setState({ event: "change", val: val }));
        this.slider.events.on("mousedown", val => this.setState({ event: "mousedown" }));
        this.slider.events.on("mouseup", val => this.setState({ event: "mouseup" }));
    }
    componentWillUnmount() {
        this.slider && this.slider.destructor();
    }
    //Slider Component End

    render() {
        return (
            <div className="Appp">
            {/* Slider Component Start */}
                <div className="Slider">
                    <div ref={el => (this.el = el)} style={{ width: "600px", height: "50px" }}></div>
                    <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
                        <button className="button button--bordered">{`Event: ${this.state.event}`}</button>
                        <button className="button button--bordered">
                        Item(debug): {this.state.val ? this.state.val : ""}
                        </button>
                    </div>
                </div>
            {/* Slider Component End */}
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
Appp.propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    mode: PropTypes.oneOf(["vertical", "horizontal"]),
    range: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.array, PropTypes.number, PropTypes.string]),
    inverse: PropTypes.bool,
    tooltip: PropTypes.bool,
    css: PropTypes.string,
    tick: PropTypes.number,
    tickTemplate: PropTypes.func,
    majorTick: PropTypes.number,
    label: PropTypes.string,
    required: PropTypes.bool,
    helpMessage: PropTypes.string,
    labelPosition: PropTypes.string,
    labelWidth: PropTypes.string,
    hiddenLabel: PropTypes.bool,
};

export default Appp;

