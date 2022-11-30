import React from "react";
import "./ScheduleSelector.css";
import ScheduleSelector from "react-schedule-selector";
import { Scheduler } from "@aldabil/react-scheduler";
import PropTypes from "prop-types";
import { Slider as SliderDHX } from "dhx-suite";
import "dhx-suite/codebase/suite.min.css";

//import { EVENTS } from "./events";
import { Button } from "@mui/material";
import { Popover } from "@mui/material";
import { Tooltip } from "@mui/material";

class Appp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            event: "",
            val: "50",
            events: [],
            //id: 10,
            id: [],
            
            count: 20,
            countid: 0,
        };
    }

    myClick(date) {
        const newStartDate = new Date()
        if(date.getMinutes() === 0){
            newStartDate.setHours(date.getHours() - 1)
        } else {
            newStartDate.setHours(date.getHours())
        }
        newStartDate.setMinutes(date.getMinutes() - 15)
        newStartDate.setDate(date.getDate())

        const newEndDate = new Date()
        newEndDate.setHours(date.getHours())
        newEndDate.setMinutes(date.getMinutes())
        newEndDate.setDate(date.getDate())

        if(newEndDate.getHours() - newStartDate.getHours() > 1){
            newStartDate.setHours(newStartDate.getHours() + 1);
        }

        var colorNum;
        var colorsel;

        while(true){        //Do something with these colors ig
            colorNum = this.state.val;
            //console.log("cN",colorNum)
            let c = colorNum/100*255;
            //console.log("c",c)
            if(c < 0){
                colorsel = "#C9C9C9"
                //colorsel = colorScheme5
                break;
            }else{
                colorsel = "rgb("+(255-c)+",190,0)";
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
            value: 50,
            label: "Set Availability:",      
            
            tick: 100,
            // majorTick: 10,
            tickTemplate: v => v,
        });

        this.slider.events.on("change", val => this.setState({ event: "change", val: val }));
        this.slider.events.on("mousedown", val => this.setState({ event: "mousedown" }));
        this.slider.events.on("mouseup", val => this.setState({ event: "mouseup" }));
        console.log("MOUNTED")
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
                    <div ref={el => (this.el = el)} style={{ width: "300px", height: "50px", justifyContent: "center" , margin: "auto"}}>asdasd</div>
                    {/* Delete these next five lines */}
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
                                background: disabled ? "#eee" : "transparent",
                                cursor: disabled ? "not-allowed" : "pointer"
                            }}
                            onClick={(e) => {
                                const ex = new Date(e.target.getAttribute("end"));
                                // this.myBool(false);
                                this.myClick(ex);
                            }}
                            disableRipple={disabled}
                            // disabled={disabled}
                            {...restProps}></Button>
                            
                            </>
                    );
                }
            }}
            />
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