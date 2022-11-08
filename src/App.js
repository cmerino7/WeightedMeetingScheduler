// online
import Calendar from 'react-calendar';
import React, { useState } from 'react';
import Switch from "react-switch";
import TimeRange from "react-time-range";
import moment from "moment";


// custom
import { useToggle } from './utils/useToggle';


import 'react-calendar/dist/Calendar.css';
import './App.css';

function App() {
{/* Calendar Variables*/}
    const [isOnWeekend, toggleWeekend] = useToggle(true);
    const [isAvailable, toggleAvailable] = useToggle(true);
    const [is24Hour, toggle24Hour] = useToggle();
    const [dateTimeObject, setTimeDate] = useState({
        startTimeDate: moment().set({hour:9, minute:0}),
        endTimeDate: moment().set({hour:17, minute:0})
    });

    const onTimeChange = (e) => {
        if(e[0] != null){
            const startDate = e[0].getDate();
            const startMonth = e[0].getMonth();
            const startYear = e[0].getFullYear();
            dateTimeObject.startTimeDate = moment(dateTimeObject.startTimeDate).set({
                'date': startDate,
                'month': startMonth,
                'year': startYear
            })

            const endDate = e[1].getDate();
            const endMonth = e[1].getMonth();
            const endYear = e[1].getFullYear();
            dateTimeObject.endTimeDate = moment(dateTimeObject.endTimeDate).set({
                'date': endDate,
                'month': endMonth,
                'year': endYear
            })

        } else {
            setTimeDate(e);
        }
        console.log(moment(dateTimeObject.startTimeDate).format())
        console.log(moment(dateTimeObject.endTimeDate).format())
    };

{/* input text field */}
    const [text, setText] = useState('');


    return (
        <div className="App">
            <div className="NavBar" >
                <div class="topnav">
                    <a href="#news">Create</a>
                    <a href="#contact">Participant</a>

                    <div className="theme-selector">

                        <select>
                            <option value="0">Light</option>
                            <option value="1">Dark</option>
                            <option value="1">Light Contrast</option>
                            <option value="1">Dark Contrast</option>
                        </select>

                    </div>

                </div>
            </div>
            <div className="page-body">
                <div>
                    <input
                        class="event-name"
                        placeholder="Event Name"

                        value={text}
                        onChange = {(e) => setText(e.target.value)}
                        style    = {{width: `${text.length}ch`}}
                        />
                </div>

                <br />
                <br />
                <div class='calender-table'>
                    <Calendar
                        onChange={onTimeChange}

                        calendarType={"US"}

                        selectRange={true}

                        tileDisabled={isOnWeekend ? ({date}) => date.getDay() == 0 || date.getDay() == 6: ({date}) => date.getDay() == null}

                        minDetail={"month"}
                        minDate={new Date()}

                        next2Label={null}
                        prev2Label={null}

                        defaultActiveStartDate={null}
                        activeStartDate={null}

                        defaultValue={null}
                        />
                </div>

                {/*
how to get the start and end dates using values
{value[0] ? value[0].toDateString() : null}
*/}

                <br/>
                <hr />
                <div class="time-range">
                    <TimeRange
                        startMoment={dateTimeObject.startTimeDate}
                        endMoment={dateTimeObject.endTimeDate}
                        onChange={onTimeChange}
                        use24Hours={is24Hour}
                        />
                    {/*
get the time in the values
{console.log(moment(timeObj.startTime).format('H:mm')) + console.log(moment(timeObj.endTime).format('H:mm'))}
*/}
                </div>
                <div class="toggle-button-page">

                    <div class="tb1">
                        <div class="tb-button">
                            <label>
                                <Switch onChange={toggleWeekend} checked={isOnWeekend}/>
                            </label>
                        </div>

                        <div class="tb-description">
                            <h3>Disable Weekend</h3>
                            <p>Toggle between enabling and disabling the weekend</p>
                        </div>
                    </div>
                    <br/>
                    <br/>
                    <div class="tb2">
                        <div class="tb-button">
                            <label>
                                <Switch
                                    onChange={toggleAvailable}
                                    checked={isAvailable}
                                    />
                            </label>
                        </div>
                        <div class="tb-description">
                            <h3>Available</h3>
                            <p>On if choosing available time or off to select unavailable time</p>
                        </div>
                    </div>
                    <br/>
                    <br/>
                    <div class="tb3">
                        <div class="tb-button">
                            <label>
                                <Switch onChange={toggle24Hour} checked={is24Hour}/>
                            </label>
                        </div>
                        <div class="tb-description">
                            <h3>24 hours</h3>
                            <p>Enable 24 hour format instead of a.m./p.m.</p>
                        </div>
                    </div>

                </div>

                <br/>
                <br/>
                <br/>
                <div>
                    <button className="create-event submit-button">Create Event</button>
                </div>
            </div>
        </div>
    );
}

export default App;
