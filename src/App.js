// online
import Calendar from 'react-calendar';
import React, { useState, useEffect } from 'react';
import Switch from "react-switch";
import TimeRange from "react-time-range";
import moment from "moment";

import 'react-calendar/dist/Calendar.css';
import './App.css';

function App() {
    // Getting stored local variables as strings
    const storedWeekend = localStorage.getItem("weekendBool");
    const hour24Bool = localStorage.getItem("hour24Bool");

    // If stored variable, set, else defaults
    const [isOnWeekend, toggleWeekend] = useState(!storedWeekend || storedWeekend === "true" ? true : false)
    const [isAvailable, toggleAvailable] = useState(true);
    const [is24Hour, toggle24Hour] = useState(!hour24Bool || hour24Bool === "false" ? false : true);

    // Calendar objects stored as Moment type
    const [dateTimeObject, setTimeDate] = useState({
        startTimeDate: moment().set({
            hour: 9,
            minute: 0
        }),
        endTimeDate: moment().set({
            hour: 17,
            minute:0
        })
    });

    // When variables updates, stores locally to access for later
    useEffect(() =>
        localStorage.setItem("weekendBool", JSON.stringify(isOnWeekend)),
        [isOnWeekend]
    );

    useEffect(() =>
        localStorage.setItem("hour24Bool", JSON.stringify(is24Hour)),
        [is24Hour]
    );





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
        // console.log(moment(dateTimeObject.startTimeDate).format())
        // console.log(moment(dateTimeObject.endTimeDate).format())
    };

    const [eventName, setEventName] = useState('');

    const [themeOptions, setTheme] = useState("Light");

    // TODO: Add theme changer
    const changeTheme = (theme) => {
        setTheme(theme);
    }

    useEffect(() => console.log(themeOptions), [themeOptions]);

    return (
        <div className="App">
            <div className="NavBar" >
                <div class="topnav">
                    <div>
                        <a href="#news">Create</a>
                        <a href="#contact">Participant</a>
                    </div>

                    <div className="theme-selector">
                        <p>Themes</p>
                        <select
                            value={themeOptions}
                            onChange={(event) => changeTheme(event.target.value)}
                        >
                            <option value="Light">Light</option>
                            <option value="Dark">Dark</option>
                        </select>

                    </div>

                </div>
            </div>
            <div className="page-body">
                <div>
                    <input
                        className="event-name"
                        placeholder="Event Name"

                        value={eventName}
                        onChange = {(e) => setEventName(e.target.value)}
                        style    = {{width: `${eventName.length}ch`}}
                        />
                </div>

                <br />
                <br />
                <div class='calender-table'>
                    <Calendar
                        onChange={onTimeChange}

                        calendarType={"US"}

                        selectRange={true}

                        tileDisabled={isOnWeekend ? ({date}) => date.getDay() === 0 || date.getDay() === 6: ({date}) => date.getDay() == null}

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
                                <Switch
                                    onChange={toggleWeekend}
                                    checked={isOnWeekend}
                                    />
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
