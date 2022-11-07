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
    const [value, onChange] = useState(new Date());
    const [isOnWeekend, toggleWeekend] = useToggle(true);
    const [isAvailable, toggleAvailable] = useToggle(true);
    const [is24Hour, toggle24Hour] = useToggle();
    const [timeObj, setTime] = useState({
        startTime: moment().set({hour:9, minute:0}),
        endTime: moment().set({hour:17, minute:0})
    });

    const onTimeChange = (e) => {
        setTime(e);
    };

    {/* input text field */}
    const [text, setText] = useState('');


    return (
        <div className="App">
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
                        onChange={onChange}

                        returnValue={value}


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
                        startMoment={timeObj.startTime}
                        endMoment={timeObj.endTime}
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
                            <h3>Weekend</h3>
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
                            <p>On if choosing selecting avaible time or off to select unavailable time</p>
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
