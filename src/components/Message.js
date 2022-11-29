import React from 'react'; 

function Message(props)
{
    if (props.isLoggedIn)
        return <h1 className='logMsg'>Welcome {props.name}</h1>;
    else
        return <h1 className='logMsg'>Please log in to select times</h1>;
}
export default Message;