//import Calendar from 'react-calendar';
//import React, { useState } from 'react';
//import Switch from "react-switch";
//import TimeRange from "react-time-range";
//import moment from "moment";
import Slider from './Slider'
import React from "react";
// custom
//import { useToggle } from './utils/useToggle';


//import 'react-calendar/dist/Calendar.css';
import './OrgParticipant.css';

function OrgParticipant() {
    return(
        <div className="orgParticipant">
            <div className="page-body">

            <header className="participant-header">
            {}
            <h1>
                {}
                Event Name: <p id="event-name"></p>
            </h1>
            <h2>
                {} 
                Use the slider down below to add each person relevant weight  <p id="event-name"></p>
            </h2>
            {}
            
            </header>
            
           
        <select name="individual" id="participant">
        <select className="Names"></select>
        <option value>Name1</option>
        <option value>Name2</option>
        <option value>Name3</option>
        <option value>Name4</option>
        <option value>Name1</option>
        <option value>Name2</option>
        <option value>Name3</option>
        <option value>Name4</option>
    </select>
    <Slider />
            </div>
            </div>
   );
}

export default OrgParticipant;
