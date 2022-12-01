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


	    let dataDropDown = list.length > 0 && list.map((item, i) => { return (
                <option key={i} value={item.id}> {item.name} {item.weight} </option>
                //add something here to update val state from db (individual weights)

                )

	    }, this);
	    let dataList = list.length > 0 && list.map((item, i) => { return (
                <li key={i} value={item.id}> {item.name} {item.weight} </li>
                //add something here to update val state from db (individual weights)

                )

	    }, this);

        //this.setState({events: {start: parseISO(this.state.events.start), end: parseISO(this.state.events.end)}})

        const {events} = this.state;
        console.log({events})

        if (events.length > 0 && !(events[0] instanceof Date)) {
            var id = 0;
            for (let i = 0; i < events.length; i++) {
                events[i].event_id = ++id;
                events[i].start = new Date(events[i].start)
                events[i].end = new Date(events[i].end)
                events[i].color = "rgb("+(255-(events[i].availability*255))+",190,0)" //EDIT COLOR HERE
            }
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


            <ol>
                {dataList}
            </ol>
            <select name="individual" id="participant">
                {dataDropDown}
        </select>
        testing inside parent value: {this.state.value}
        <Slider
          dataFromParent = {this.state.value}      //data to child
          parentCallback = {this.callbackFunction} //data from child
        />


        <Scheduler
            events = {events}
            week={{
                weekDays: [0, 1, 2, 3, 4, 5],
                weekStartOn: 6,
                startHour: 8,
                endHour: 13,
                step: 15}}>

        </Scheduler>
                </div>
                </div>
       );
    }
}

export default OrgParticipant;
