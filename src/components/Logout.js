import React from 'react';
import './ScheduleSide.css';

function Logout(props)
{
    return(
            <div>
                <button className='logoutButton' onClick = {props.onClickFunc}>Logout</button>
            </div>
       );
}
export default Logout