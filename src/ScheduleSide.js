import React from 'react';
import Message from './Message';
import Login from './Login';
import Logout from './Logout';
import Slider from './Slider'
import Appp from './ScheduleSelector';
import ReactSlider from "react-slider";
import SliderEvents from './Slider';


class Homepage extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = { currentName: "test"}
        this.state = {isLoggedIn : false};
 
        this.loginClicked = this.loginClicked.bind(this);
        this.logoutClicked = this.logoutClicked.bind(this);
    }
 
    loginClicked()    {
        this.setState({isLoggedIn : true});
    }
 
    logoutClicked()    {
        this.setState({isLoggedIn : false});
    }

    render(){
        const {currentName} = this.state;
         return(
             <div>
                 <Message isLoggedIn = {this.state.isLoggedIn} name={currentName}/>
                { 
                    (this.state.isLoggedIn)?(
                    <div>
                    <Logout onClickFunc = {this.logoutClicked} />
                        <div className='Slider'>
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