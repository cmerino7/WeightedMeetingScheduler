import React from 'react';
import ReactDOM from 'react-dom/client';
//import ScheduleSelector from 'react-schedule-selector/dist/lib/ScheduleSelector';
import './index.css';
//import Appp from './ScheduleSelector';
//import Appp from './Appp';
/*import App from './App';*/
import Participant from './Participant';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <Appp /> */}
    <Participant />
    {/* <App /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
