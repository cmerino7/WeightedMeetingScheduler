import Calendar from 'react-calendar';
import React from 'react';
import Switch from "react-switch";


import { useState } from 'react';
import { useToggle } from './utils/useToggle';
import { Time } from './components/TimeRange';


import 'react-calendar/dist/Calendar.css';
import './App.css';


function App() {
    const [value, onChange] = useState(new Date());
    const [isOnWeekend, toggleWeekend] = useToggle(true);
    const [isAvailable, toggleAvailable] = useToggle(true);




    return (
        <div className="App">
            <div className='intro'>
                <div class="login-form">

                    <h1>Create Event</h1>

                    <div>
                        <input class="event-name" placeholder="Event Name"/>
                    </div>

                   <br />
                    <br />
                    <div class='calender-table'>
                        <Calendar
                            onChange={onChange}

                            value={null}
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
                    <div>
                        <Time />
                    </div>
                                            <div class="buttonbs">

                        <div class="toggle-buttons-1">
                            <div class="left-side">
                                <label>
                                    <Switch onChange={toggleWeekend} checked={isOnWeekend}/>
                                </label>
                            </div>

                            <div class="left-side-text">
                                <h3>Weekend</h3>
                                <p>Toggle between enabling and disabling the weekend</p>
                            </div>
                        </div>
                        <br/>
                        <br/>
                        <div class="toggle-buttons-2">
                            <div class="left-side">
                                <label>
                                    <Switch onChange={toggleAvailable} checked={isAvailable}/>
                                </label>
                            </div>
                            <div class="left-side-text">
                                <h3>Available</h3>
                                <p>On if choosing selecting avaible time or off to select unavailable time</p>
                            </div>
                        </div>

                    </div>

                    <br/>
                    <br/>
                    <br/>
                    <div>
                        <button>Create Event</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
