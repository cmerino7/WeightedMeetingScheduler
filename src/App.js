// online
import React, {useEffect, useState}  from 'react';
import { Link, Route, Routes } from 'react-router-dom';





import Create from './Create.js';
import  Users from './users.js';

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
                        <Link to="/users">Users</Link>
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
            <Route path="/users" element={<Users />} />
        </Routes>
        </>
    )
}

export default App;
