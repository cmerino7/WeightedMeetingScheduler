import React from "react";
import "./ScheduleSelector.css";
import ScheduleSelector from "react-schedule-selector";
import { Scheduler } from "@aldabil/react-scheduler";
import PropTypes from "prop-types";
import { Slider as SliderDHX } from "dhx-suite";
import "dhx-suite/codebase/suite.min.css";
import "./ScheduleSelector.css"
//import { EVENTS } from "./events";
import { Button } from "@mui/material";
import { Popover } from "@mui/material";
import { Tooltip } from "@mui/material";
import scale from './scale.png'

class Appp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            event: "",
            val: "100",
            events: [],
            //id: 10,
            id: [],
            currentName: props.dataFromParent,
            count: 20,
            countid: 0,
        };
    }

    myClick(date) {
        const newStartDate = new Date(date)
        if (date.getMinutes() === 0) {
            newStartDate.setHours(date.getHours() - 1)
        } else {
            newStartDate.setHours(date.getHours())
        }
        newStartDate.setMinutes(date.getMinutes() - 15)
        newStartDate.setDate(date.getDate())

        const newEndDate = new Date(date)
        newEndDate.setHours(date.getHours())
        newEndDate.setMinutes(date.getMinutes())
        newEndDate.setDate(date.getDate())

        if (newEndDate.getHours() - newStartDate.getHours() > 1) {
            newStartDate.setHours(newStartDate.getHours() + 1);
        }

        var colorNum;
        var colorsel;

        while (true) {        //Do something with these colors ig
            colorNum = this.state.val;
            let r =(colorNum-50)*255/100*2
            console.log("r,g",r)
            if(colorNum < 50){
                colorsel = "rgb(255,"+(255+r)+","+(255+r)+")";
                console.log("colorselect",colorsel);
                break;
            }
            else if(colorNum >= 50){
                colorsel = "rgb("+(255+(-r))+",255,"+(255+(-r))+")";
                console.log("colorselect",colorsel);
                break;
            }else{
                colorsel = "000000";
                // window.alert("error try again!!")
                break;
            }
        }



        console.log(colorsel)
        const table = this.state.events
        //const title = "Event " + this.state.id
        const title = "Event " + this.state.countid
        // this.state.id.push(this.state.count)
        table.push({
            //event_id: this.state.id,
            event_id: this.state.count + 1,
            title: title,
            start: newStartDate,
            end: newEndDate,
            //color: "#ff0000",
            color: colorsel,

        })
        console.log(table)

        let url = "http://localhost:8080/database/Post/" + this.state.currentName + "/" + newStartDate + "/" + newEndDate + "/" + this.state.val
        fetch(url)

        this.setState({
            events: table,
            // id: this.state.id + 1,
            // id: this.state.id,
            count: this.state.count + 1,
            countid: this.state.countid + 1,
        })
    };

    delEvent(id) {
        console.log('Deleting Event')

        var index = this.state.id.indexOf(id)

        this.state.id.splice(index, 1)
        let delevent = this.state.events.splice(index, 1)
        console.log(delevent)
        console.log(delevent[0].start)
        let url = "http://localhost:8080/database/Delete/" + this.state.currentName + "/" + delevent[0].start
        fetch(url)


        this.setState({
            events: this.state.events,
            //id: this.state.id + 1,
            id: this.state.id,
            count: this.state.count,
            countid: this.state.countid,
        })

        /*
        let url = "http://localhost:8080/database/Delete/" + this.state.currentName + "/" + newStartDate
        fetch(url)
            .then(res => res.json())
            .then(json => console.log(json))
        */
    };

    //Slider Component Start
    componentDidMount() {
         let url = "http://localhost:8080/database/CalendarOfP/" + this.state.currentName
         fetch(url)
             .then(res => res.json())
             .then(json => this.setState({ events: json }))
             .then(output => console.log("getting all availabilities"))

        this.slider = new SliderDHX(this.el, {
            css: 'custom_class',
            min: 0,
            max: 100,
            step: 1,
            thumbLabel: true,
            value: 100,
            label: "Set Your Availability:",      
            
            // tick: 50,
            // majorTick: 10,
            //tickTemplate: v => v,
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
        const { events } = this.state;
        console.log({ events })


         // if (events.length > 0 && !(events[0] instanceof Date)) {
         //     var id = 0;
         //     for (let i = 0; i < events.length; i++) {
         //        events[i].event_id = ++id;
         //        events[i].start = new Date(events[i].start)
         //        events[i].end = new Date(events[i].end)
         //        events[i].color = "rgb("+(255-(events[i].availability*255))+",190,0)" //EDIT COLOR HERE
         //     }
         // }

        return (
            <div className="Appp">
                {/* Slider Component Start */}
                <div className="Slider">
                    <div ref={el => (this.el = el)} style={{ width: "300px", height: "50px", justifyContent: "center" , margin: "auto"}}></div>
                    <div className="scale"><img src={scale} ></img></div>
                    <p className="avail-label">Less&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;More</p>
                    
                    
                    
                    







                    {/* Delete these next five lines */}
                    {/* <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
                        <button className="button button--bordered">{`Event: ${this.state.event}`}</button>
                        <button className="button button--bordered">
                        Item(debug): {this.state.val ? this.state.val : ""}
                        </button>
                    </div> */}
                </div>
                {/* Slider Component End */}
                <div className="Scheduler">
                    <Scheduler
                        height={100}
                        navigationPickerProps={{
                            minDate: new Date(2021, 0, 1),
                            maxDate: new Date(2022, 11, 31),
                        }}

                        events={this.state.events}
                        view="week"
                        day={null}
                        month={null}
                        onDelete={(id) => this.delEvent(id)}

                        // customEditor={(e) => <Popover
                        //     open={Boolean(this.myBool)}
                        //     anchorReference={this.currentTarget}
                        //     anchorOrigin={{vertical: "center", horizontal:"center"}}>
                        // </Popover>}
                        week={{
                            weekDays: [0, 1, 2, 3, 4, 5],
                            weekStartOn: 6,
                            startHour: 8,
                            endHour: 13,
                            step: 15,
                            cellRenderer: ({ height, start, onClick, ...props }) => {
                                // Fake some condition up
                                const hour = start.getHours();
                                const disabled = hour === 14;
                                const restProps = disabled ? {} : props;
                                return (
                                    <>
                                        <Button
                                            style={{
                                                height: "100%",
                                                // background: disabled ? "#eee" : "transparent",
                                                // cursor: disabled ? "not-allowed" : "pointer"
                                            }}
                                            onClick={(e) => {
                                                const ex = new Date(e.target.getAttribute("end"));
                                                // this.myBool(false);
                                                this.myClick(ex);
                                            }}
                                            // disableRipple={disabled}
                                            // disabled={disabled}
                                            {...restProps}></Button>

                                    </>
                                );
                            }
                        }}
                        eventRenderer={() => {
                            return (
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                        height: "50%",
                                    }}
                                >
                                </div>
                            );
                        }}
                    />
                </div>
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
