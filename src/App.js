import './App.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';

function App() {
    const [date, setDate] = useState(new Date());
    return (
        <div className="App">
            <div className='intro'>
                <div className='intro-left'>
                    <div class="login-form">
                            <h1>Create Event</h1>
                            <div class='ex'>
                                <Calendar
                                    onChange={setDate}
                                    value={date}
                                    selectRange={true}
                                    />
                            </div>
                            {date.length > 0 ? (
                                <p className='text-center'>
                                    <span className='bold'>Start:</span>{' '}
                                    {date[0].toDateString()}
                                    &nbsp;|&nbsp;
                                    <span className='bold'>End:</span> {date[1].toDateString()}
                                </p>
                            ) : (
                                    <p className='text-center'>
                                        <span className='bold'>Default selected date:</span>{' '}
                                        {date.toDateString()}
                                    </p>
                                )}
                        </div>
                </div>
                <div className='intro-right'>
                    <h2>TODO: pfp</h2>
                </div>
            </div>
            </div>
    );
}

export default App;
