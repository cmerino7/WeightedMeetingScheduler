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
    {/* Calendar and Time Variables*/}
    const [isOnWeekend, toggleWeekend] = useToggle(true);
    const [isAvailable, toggleAvailable] = useToggle(true);
    const [is24Hour, toggle24Hour] = useToggle();
    const [dateTimeObject, setDateTime] = useState({
        startDateTime: moment().set({
            hour:   9,
            minute: 0
        }),

        endDateTime: moment().set({
            hour:   17,
            minute: 0
        })
    });

    const onDateTimeChange = (e) => {
        if(e[0] != null){
            // Changing the calendar
            // e = Date object
            // translating Date to moment
            const startDate = e[0].getDate();
            const startMonth = e[0].getMonth();
            const startYear = e[0].getFullYear();
            dateTimeObject.startDateTime = moment(dateTimeObject.startDateTime).set({
                'date':     startDate,
                'month':    startMonth,
                'year':     startYear
            })

            const endDate = e[1].getDate();
            const endMonth = e[1].getMonth();
            const endYear = e[1].getFullYear();
            dateTimeObject.endDateTime = moment(dateTimeObject.endDateTime).set({
                'date':     endDate,
                'month':    endMonth,
                'year':     endYear
            })

            // console.log(moment(timeObj.startTime).format('YYYY-MM-DD hh:mm a'));
            // console.log(moment(timeObj.endTime).format('YYYY-MM-DD hh:mm a'));

        } else {
            // Changing the time
            // e = moment object
            setDateTime(e);
        }
        // console.log(moment(dateObject.startTime).format())
        // console.log(moment(dateObject.endTime).format())
    };

    {/* input text field */}
    const [eventName, setEventText] = useState('');


    return (
        <div className="App">
            <div className="page-body">
                <div>
                    <input
                        class="event-name"
                        placeholder="Event Name"

                        value={eventName}
                        onChange = {(e) => setEventText(e.target.value)}
                        style = {{width: `${eventName.length}ch`}}
                        />
                </div>

                <br />
                <br />
                <div class='calender-table'>
                    <Calendar
                        onChange={onDateTimeChange}

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
                        startMoment={dateTimeObject.startDateTime}
                        endMoment={dateTimeObject.endDateTime}
                        onChange={onDateTimeChange}
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
