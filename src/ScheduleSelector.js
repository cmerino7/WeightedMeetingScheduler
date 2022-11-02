import ScheduleSelector from 'react-schedule-selector'
 
class App extends React.Component {
  state = { schedule = [] }
 
  handleChange = newSchedule => {
    this.setState({ schedule: newSchedule })
  }
 
  render() {
    return (
      <ScheduleSelector
        selection={this.state.schedule}
        numDays={4}
        minTime={9}
        maxTime={17}
        hourlyChunks={2}
        onChange={this.handleChange}
      />
    )
  }
}

export default ScheduleSelector;