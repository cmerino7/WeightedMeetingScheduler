
import './App.css';
import { useState } from 'react';
import Calendar from 'react-calendar';

function ex() {
    const [date, setDate] = useState(new Date());
    return (
        <div className="App">
            <div className='intro'>
                <div className='intro-left'>
                    <div class="login-form">
                        <form>
                            <h1>Create Event</h1>
                        </form>
                    </div>
                    <script  src="./script.js"></script>
                </div>
                <div className='intro-right'>
                    <h2>TODO: pfp</h2>
                    <h1>shit</h1>
                </div>
            </div>
        </div>
    );
}

export default ex;
