// online
import React, {useEffect, useState}  from 'react';
import { Link, Route, Routes } from 'react-router-dom';





import Create from './components/Create.js';
import Part from './components/Participant.js';


function App() {
    const [themeOptions, setTheme] = useState("Light");

    // TODO: Add theme changer
    const changeTheme = (theme) => {
        setTheme(theme);
    }

    useEffect(() => console.log(themeOptions), [themeOptions]);

    return (
        <>
        <nav>
                <div class="topnav">
                    <div>
                        <Link to="/">Create</Link>
                    </div>
                    <div>
                        <Link to="/Participant">Participant</Link>
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
        </nav>
        <Routes>
            <Route path="/" element={<Create />} />
            <Route path="/Participant" element={<Part />} />
        </Routes>
        </>
    )
}

export default App;
