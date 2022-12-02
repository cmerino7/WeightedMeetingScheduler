import React from 'react'; 

function Message(props)
{
    if (props.isLoggedIn)
        return <h2 className='logMsg'>Welcome {props.name}, please select your available times:</h2>;
    else
        return <h2 className='logMsg'>Please enter your name</h2>;
}
export default Message;