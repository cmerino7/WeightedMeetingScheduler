import './Participant.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
const events = [
    {
      id: 1,
      title: 'event 1',
      start: '2022-10-25T10:00:00',
      end: '2022-10-25T12:00:00',
    },
    {
      id: 2,
      title: 'event 2',
      start: '2022-10-28T13:00:00',
      end: '2022-10-28T18:00:00',
    },
    { id: 3, title: 'event 3', start: '2022-10-29', end: '2022-10-29' },
  ];
  
function Participant() {
    return (
      <div className="participant">
        <header className="participant-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1>
            {/* Edit <code>src/App.js</code> and save to reload. */}
            Event Name:
          </h1>
          {/* <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a> */}
          <div className="App">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          center: 'timeGridWeek,timeGridDay new',
        }}
        customButtons={{
          new: {
            text: 'new',
            click: () => console.log('new event'),
          },
        }}
        events={events}
        eventColor="red"
        nowIndicator
        dateClick={(e) => console.log(e.dateStr)}
        eventClick={(e) => console.log(e.event.id)}
      />
    </div>
        </header>

    
        {/* <div className="App">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          center: 'dayGridMonth,timeGridWeek,timeGridDay new',
        }}
        customButtons={{
          new: {
            text: 'new',
            click: () => console.log('new event'),
          },
        }}
        events={events}
        eventColor="red"
        nowIndicator
        dateClick={(e) => console.log(e.dateStr)}
        eventClick={(e) => console.log(e.event.id)}
      />
    </div> */}
      </div>
    );
  }
  
  export default Participant;
  