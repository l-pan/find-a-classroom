import { findRoom, toMinute } from './helpers';

function reduceRoom(rooms, courses) {
  courses.forEach(course => {
    course.meeting.forEach(meet => {
      const index = findRoom(meet.room, rooms);

      if (index >= 0) {
        if (meet.day.length === 1) {
          rooms[index].reduce(meet.day, meet.time.map(i => toMinute(i)));
        } else {
          meet.day.split('').forEach(day => {
            rooms[index].reduce(day, meet.time.map(i => toMinute(i)));
          });
        }
      }
    });
  });
}

export default reduceRoom;
