import React from 'react';
import './ScheduleSide.css';

function Logout(props)
{
    return(
            <div>
                <button className='logButton' onClick = {props.onClickFunc}>Logout</button>
            </div>
       );
}
export default Logout