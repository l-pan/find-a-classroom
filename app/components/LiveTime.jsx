import React, { Component } from 'react';
import getTime from '../helpers/getTime.js';

const style = {
  time: {
    marginTop: '0.5em',
    fontSize: '3em',
  },
  day: {
    fontSize: '1.5em',
  },
};

class LiveTime extends Component {

  constructor() {
    super();

    this.state = {};
    this.setTime = this.setTime.bind(this);
  }

  componentWillMount() {
    this.setTime();
  }

  componentDidMount() {
    this.loadInterval = setInterval(() => {
      this.setTime();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.loadInterval);
    this.loadInterval = false;
  }

  setTime() {
    this.setState({
      hours: getTime().hours,
      minutes: getTime().minutes,
      seconds: getTime().seconds,
    });
  }

  render() {
    return (
      <div>
        <div className="row center-xs" style={style.time}>
          {`${this.state.hours}:${this.state.minutes}:${this.state.seconds}`}
        </div>
        <div className="row center-xs" style={style.day}>
          {getTime().day[1]}
        </div>
      </div>
    );
  }
}

export default LiveTime;
