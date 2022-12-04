import React from 'react'; 
// import './ScheduleSide.css'

function Message(props)
{
    if (props.isLoggedIn)
        return <h2 className='logMsg'>Welcome {props.name}, please select your available times:</h2>;
    else
        return <h2 className='loginMsg'>Please enter your name to continue</h2>;
}
export default Message;