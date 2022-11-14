import React from 'react';
import ScheduleSide from './ScheduleSide'
import Message from './Message';

const data = ''

class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      
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
        
        <form onSubmit={this.props.onClickFunc} > 
        {/* <form onSubmit={this.handleSubmit}>    use this to handle events later   */}
            <label>
                Name:
                <input type="text" value={this.state.value} onChange={this.handleChange} />    
            </label>
          <input type="submit" value="Submit" />
          <Message data={data}/>
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