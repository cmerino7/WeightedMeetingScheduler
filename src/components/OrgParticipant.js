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
import './OrgParticipant.css'
import e from "cors";
import ProgressBar from "@ramonak/react-progress-bar";


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
            currentParticipant: "NOBODY SELECTED"
        }
    }

    callbackFunction = (childData) => { //when slider is moved, will update this state
        this.setState({ value: childData });
     };

    getLink = (e) => {
        const changeValue = e.target.value
        this.setState({currentParticipant:this.state.list[changeValue-1].name})
        console.log(this.state.list[changeValue-1].name )
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
            )
        }, this);
	    let dataList = list.length > 0 && list.map((item, i) => { return (
            <div className="nameList-container">
            <li key={i} value={item.id}>{item.name} <div className="progBar"> <ProgressBar completed={item.weight*100} 
                                                                bgColor="#1976d2"
                                                                height="15px"
                                                                borderRadius="6px"
                                                                labelSize="13px"
                                                                /></div></li></div>
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
                events[i].color = "rgb("+(255-(events[i].availability*255))+",190,0,"+(this.state.value/100)+")" //EDIT COLOR HERE
            }
        }
        return(
            <div className="orgParticipant">
                
                <div className="page-body">
                <header className="participant-header">
                <div className="style">
                {}
                <h1>
                    {}
                    Event Name: {this.state.data.map(el => (
                        <ul style = {{listStyle:'none'}}>
                        <li>{el.name}</li>
                        </ul>
                        ))}<p id="event-name"> </p>
                </h1>
                <div className="style"></div>
                {}
                <p>
                    {}
                    Please use the slider to change participant's relevance-weight
                    <br></br>test-currentName: {this.state.currentParticipant} <p id="event-name"></p>

                    </p>

            <select className="select" name="individual" id="participant" onChange={(e) => this.getLink(e)}>
            <option value="" selected="true" disabled="disabled">Select Participant...</option>
                {dataDropDown}
            </select>
        <Slider className ="slider"
          dataFromParent = {this.state.value}      //data to child
          parentCallback = {this.callbackFunction} //data from child
        />
        <ul className="list">
            <h3 className="partHeader">Participant List</h3>
            <h6 className="partLabels">Name&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Relevance</h6>
            {dataList}
        </ul>
            </div>
        </header>

        <div className="schedule">
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
          </div>

       );
    }
}

export default OrgParticipant;
