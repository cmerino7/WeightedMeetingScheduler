import React from 'react';
import ScheduleSide from './ScheduleSide'
import Message from './Message';
import './ScheduleSide.css'

const data = ''

class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      
    }

    sendData = () => { 
      this.props.parentCallback(this.state.value); 
      this.props.onClickFunc();
      console.log("FROM LOGIN CHILD", this.state.value)
    }

    handleChange(event) {    
      this.setState({value: event.target.value});  
    }
    
    handleSubmit(event) {
      alert('A name was submitted: ' + this.state.value);
      //send the name to backend
      event.preventDefault();

    }
    render() {
      //const data = {};
      return (
          <form className="loginForm" onSubmit={this.sendData} > 
            <label id="nameformLabel" for="nameForm">Full Name</label><br></br>
            <input id="nameForm" className="nameField" type="text" value={this.state.value} onChange={this.handleChange}/>
            <br></br>    
            <input className='logButton' type="submit" value="Submit" />
          </form>
      );
    }
  }



export default Login;









// function Login(props)
// {
//    return(
//            <div className='logButton' >
//            <form>
//             <button onClick = {props.onClickFunc}>
//                 Login
//             </button>
//            </form>
//            </div>
//        );
// }
// export default Login;