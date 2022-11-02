import Calendar from 'react-calendar';
import React from 'react';

import { useState } from 'react';
import { useToggle } from './utils/useToggle';

import 'react-calendar/dist/Calendar.css';
import './App.css';

function App() {
    const [value, onChange] = useState(new Date());
    const [isOnWeekend, toggleWeekend] = useToggle();



    return (
        <div className="App">
            <div className='intro'>
                <div className='intro-left'>
                    <div class="login-form">
                        <h1>Create Event</h1>
                        <div>
                            <input class="event-name" placeholder="Event Name"/>
                        </div>
                        <br></br>
                        <div>
                            <button onClick={toggleWeekend}>
                                Weekend
                            </button>

                        </div>

                        <form>Add some stuff</form>
                        <div class='calender-table'>
                            <Calendar
                                onChange={onChange}
                                value={value}
                                calendarType={"US"}
                                selectRange={true}
                                tileDisabled={isOnWeekend ? ({date}) => date.getDay() == 0 || date.getDay() == 6: ({date}) => date.getDay() == null}
                                minDetail={"month"}
                                next2Label={null}
                                prev2Label={null}
                                />
                        </div>
                        <div>
                            <p>Availability</p>
                            <input type="checkbox" />
                        </div>
                    </div>
                </div>
                <div className='intro-right'>
                    <h2>TODO: Other bs</h2>
                    <form>
                        <button>
                            URL Generator
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default App;
