import React from 'react';
function Logout(props)
{
    return(
            <div className='logButton' >
                <button onClick = {props.onClickFunc}>
                    Logout
                </button>
            </div>
       );
}
export default Logout