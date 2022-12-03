import React from 'react';
import Message from './Message';
import Login from './Login';
import Logout from './Logout';
import Slider from './Slider'
import Appp from './ScheduleSelector';
import ReactSlider from "react-slider";
import SliderEvents from './Slider';
import './ScheduleSide.css'


class Homepage extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            isLoggedIn : false,
            currentName: "test" //SEND THIS TO BACKEND
        };
 
        this.loginClicked = this.loginClicked.bind(this);
        this.logoutClicked = this.logoutClicked.bind(this);
    }
 
    callbackFunction = (childData) => { //Sends callback to get Participant Name
        this.setState({ currentName: childData });
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
             <div className='LoginPage'>
                 <Message isLoggedIn={this.state.isLoggedIn} name={this.state.currentName}/>
                { 
                    (this.state.isLoggedIn)?(
                    <div>
                        <div className="logout-div"><Logout onClickFunc = {this.logoutClicked} /></div>
                        <div className='Slider'>
                            <div className="ScheduleSelector">
                                <Appp dataFromParent = {this.state.currentName}/>
                            </div>
                        </div>
                    </div>
                    ) : (
                        <Login onClickFunc = {this.loginClicked} parentCallback = {this.callbackFunction} />
                    )
                }
            </div>
            );
    }
}
export default Homepage;