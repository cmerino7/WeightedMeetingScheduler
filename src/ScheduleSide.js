import React from 'react';
import Message from './Message';
import Login from './Login';
import Logout from './Logout';
import Slider from './Slider'
import Appp from './ScheduleSelector';

class Homepage extends React.Component{
 
    constructor(props)
    {
        super(props);
 
        this.state = {isLoggedIn : false};
 
        this.loginClicked = this.loginClicked.bind(this);
        this.logoutClicked = this.logoutClicked.bind(this);
    }
 
    loginClicked()
    {
        this.setState({isLoggedIn : true});
    }
 
    logoutClicked()
    {
        this.setState({isLoggedIn : false});
    }
 
    render(){
 
        return(
 
            <div>
 
                <Message isLoggedIn = {this.state.isLoggedIn}/>

                {
                    (this.state.isLoggedIn)?(
                    <div>
                    <Logout onClickFunc = {this.logoutClicked} />
                    
                        <div className='Slider'>
                        <Slider/>
                            <p>Select Availability:</p>
                            <div className="ScheduleSelector">
                                <Appp
                                // calendar={calendar}
                                // handleSubmitCalendar={handleSubmitCalendar}
                                />
                                
                            </div>
                        </div>
                    </div>
                    ) : (
                        <Login onClickFunc = {this.loginClicked} />
                        )
                }
 
            </div>
                 
            );
    }
}
    export default Homepage;