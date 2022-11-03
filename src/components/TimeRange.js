import React, { Component } from "react";


import moment from "moment";
import TimeRange from "react-time-range";

export class Time extends Component {
    state = {
        startTime: moment(),
        endTime: moment()
    };

    returnFunctionStart = event => {
        this.setState({ startTime: event.startTime });
    };

    returnFunctionEnd = event => {
        this.setState({ endTime: event.endTime });
    };

    render() {
        return (
            <TimeRange
                onStartTimeChange={this.returnFunctionStart}
                onEndTimeChange={this.returnFunctionEnd}
                startMoment={this.state.startTime}
                endMoment={this.state.endTime}
                />
        );
    }
}

