import { toTime } from './helpers';

class Room {

  constructor(name) {
    this.name = name;
    // represented in minutes => 24h * 60 min/h = 1440
    // school starts at 8:15 and ends at 18:15
    this.time = {
      M: [[495, 1095]],
      T: [[495, 1095]],
      W: [[495, 1095]],
      H: [[495, 1095]],
      F: [[495, 1095]],
    };
  }

  // inspired by redux's immutable state tree concept ;)
  reduce(day, interval) {
    const schedule = this.time[day];

    for (let i = 0; i < schedule.length; i++) {
      // if the interval entered is a subset of an interval of SCHEDULE
      if (interval[0] >= schedule[i][0] && interval[1] <= schedule[i][1]) {
        const front = schedule.slice(0, i);
        const back = schedule.slice(i + 1, schedule.length);
        let newArr;

        if (interval[0] === schedule[i][0] && interval[1] !== schedule[i][1]) {
          newArr = [[interval[1], schedule[i][1]]];
        } else if (interval[0] !== schedule[i][0] && interval[1] === schedule[i][1]) {
          newArr = [[schedule[i][0], interval[0]]];
        } else if (interval[0] === schedule[i][0] && interval[1] === schedule[i][1]) {
          newArr = [];
        } else {
          newArr = [
            [schedule[i][0], interval[0]],
            [interval[1], schedule[i][1]],
          ];
        }

        this.time[day] = front.concat(newArr).concat(back);

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
