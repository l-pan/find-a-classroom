import React, { Component } from 'react';
import getRooms from '../helpers/getRooms';
import getTime from '../helpers/getTime';

import RoomList from './RoomList';

// Component takes currentTime:string and day:char -> a list of room objects
class GetFreeRooms extends Component {

  constructor() {
    super();
    this.state = { freeRooms: [] };
    this.filterRooms = this.filterRooms.bind(this);
    this.remainedTime = this.remainedTime.bind(this);
  }

  componentDidMount() {
    if (getTime().day[0]) {
      this.serverRequest = getRooms((err, data) => {
        this.allRooms = JSON.parse(data.text);
        this.filterRooms(getTime().totalTime, getTime().day[0], this.allRooms);
        this.remainedTime();
      });

      // update every minute to keep track on remaining time
      this.loadInterval = setInterval(() => {
        this.remainedTime();
      }, 60000);
    }
  }

  componentWillUnmount() {
    if (this.serverRequest) {
      this.serverRequest.abort();
    }
    clearInterval(this.loadInterval);
    this.loadInterval = false;
  }

  remainedTime() {
    let expired = false;

    const freeRooms = this.state.freeRooms.
      map(freeRoom => {
        const remainedTime = freeRoom.endTime - getTime().totalTime;
        if (remainedTime <= 0) {
          expired = true;
        }
        return Object.assign({}, freeRoom, { remainedTime });
      }).
      sort((a, b) => {
        if (a.remainedTime > b.remainedTime) {
          return -1;
        } else if (a.remainedTime < b.remainedTime) {
          return 1;
        }
        return 0;
      });

    if (expired) {
      this.filterRooms(getTime().totalTime, getTime().day[0], this.allRooms);
      this.remainedTime();
    } else {
      this.setState({
        freeRooms,
      });
    }
  }

  // time is in minutes
  filterRooms(time, day, rooms) {
    const freeRooms = [];

    rooms.forEach(room => {
      room.time[day].forEach(timeSlot => {
        if (time >= timeSlot[0] && time <= timeSlot[1]) {
          freeRooms.push(Object.assign({}, room, { endTime: timeSlot[1] }));
        }
      });
    });

    this.setState({ freeRooms });
  }

  render() {
    return (
      <div>
        <RoomList freeRooms={this.state.freeRooms} />
      </div>
    );
  }
}

export default GetFreeRooms;
