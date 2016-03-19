import { toTime } from './helpers';

class Room {

  constructor(name) {
    this.name = name;
    // represented in minutes => 24h * 60 min/h = 1440
    this.time = {
      M: [[0, 1440]],
      T: [[0, 1440]],
      W: [[0, 1440]],
      H: [[0, 1440]],
      F: [[0, 1440]],
    };
  }

  // inspired by redux's immutable state tree concept ;)
  reduce(day, interval) {
    const schedule = this.time[day];

    for (let i = 0; i < schedule.length; i++) {
      // if the interval entered is a subset of an interval of SCHEDULE
      if (interval[0] > schedule[i][0] && interval[1] < schedule[i][1]) {
        const front = schedule.slice(0, i);
        const back = schedule.slice(i + 1, schedule.length);

        this.time[day] = front.concat([
          [schedule[i][0], interval[0]],
          [interval[1], schedule[i][1]],
        ]).concat(back);

        break;
      }

      if (interval[0] === schedule[i][0] && interval[1] === schedule[i][1]) {
        // if the two are the same, remove the entire interval
        this.time[day] = schedule.slice(0, i).concat(schedule.slice(i + 1, schedule.length));

        break;
      }
    }
  }

  // convert minute to human-readable time format
  toHours() {
    for (const key in this.time) {
      if (!this.time.hasOwnProperty(key)) continue;
      this.time[key] = this.time[key].map(i => i.map(j => toTime(j)));
    }
  }
}

export default Room;
