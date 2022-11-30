// import { Slider } from "@mui/material";
import Slider from "./Slider"
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Scheduler } from "@aldabil/react-scheduler";
import { parseISO, format } from 'date-fns';

import ReactSlider from "react-slider";
import { useState } from "react";
import PropTypes from "prop-types";
import { Slider as SliderDHX } from "dhx-suite";
import "dhx-suite/codebase/suite.min.css";




class OrgParticipant extends Component{
    constructor(){
        super();
        this.state = {
            list: [],
            data: [],
            times: [],
            availability: [],
            events: [],
            value: 69, //THIS SHOULD BE SET FROM BACKEND(CURRENT PARTICIPANT WEIGHT)
            stop: 0 //temporary limiter on handling events
        }
    }
    
    callbackFunction = (childData) => { //when slider is moved, will update this state
        this.setState({ value: childData });
     };

    componentDidMount() { 
        fetch("http://localhost:8080/database/ParticipantList")
            .then(res => res.json())
            .then(json => this.setState({ list: json }))

        fetch("http://localhost:8080/database/CalendarName/1")
            .then(res => res.json())
            .then(json => this.setState({data: json}))

        fetch("http://localhost:8080/database/alltime/test/1")
            .then(res => res.json())
            .then(json => this.setState({ times: json }))
            .then(output => console.log("getting all times"))

        fetch("http://localhost:8080/database/allava/test/1")
            .then(res => res.json())
            .then(json => this.setState({ availability: json }))
            .then(output => console.log("getting all availabilities"))

        fetch("http://localhost:8080/database/getevents/1")
            .then(res => res.json())
            .then(json => this.setState({ events: json }))
            .then(output => console.log("getting all availabilities")) 
    }

    render(){

        const { list } = this.state;
        const { times } = this.state;
        const { availability } = this.state;
        
        console.log("list",{list})
        console.log("times",{times})
        console.log("avail",{availability})


	    let dataList = list.length > 0 && list.map((item, i) => {
		    return (
                <option key={i} value={item.id}> {item.name} </option>
                //add something here to update val state from db (individual weights)

                )

	    }, this);

 

        //this.setState({events: {start: parseISO(this.state.events.start), end: parseISO(this.state.events.end)}})

        const {events} = this.state;
        console.log({events})

        //bruh this shit laggy af so im limiting it to 30 for now
        if (this.state.stop !== 30){
            for(let i = 0; i < events.length; i++){
                events[i].start = new Date(events[i].start)
                events[i].end = new Date(events[i].end)

                //temporary color scheme
                events[i].color = "rgb("+(255-(events[i].availability*255))+",190,0)"


                console.log("color",events[i].availability*255)
                this.setState(
                    { events: events }
                )
            }
            this.setState({stop: this.state.stop+1})
        }
        return(
            <div className="orgParticipant">
                <div className="page-body">

                <header className="participant-header">
                {}
                <h1>
                    {}
                    Event Name: {this.state.data.map(el => (
                        <ul style = {{listStyle:'none'}}>
                        <li>{el.name}</li>
                        </ul>
                        ))}<p id="event-name"> </p>

                </h1>
                <h2>
                    {}
                    Please use the slider to change participant's relevance-weight <p id="event-name"></p>
                </h2>
                {}

                </header>


            <select name="individual" id="participant">
                {dataList}
        </select>
        testing inside parent value: {this.state.value}
        <Slider
          dataFromParent = {this.state.value}      //data to child
          parentCallback = {this.callbackFunction} //data from child
        />


        <Scheduler events = {events}>

        </Scheduler>
                </div>
                </div>
       );
    }
}

export default OrgParticipant;