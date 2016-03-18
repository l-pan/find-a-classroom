import { notInArray } from './helpers';

// return a list of unique room names
function getRooms() {
  const courses = require('../data/details.json');
  const rooms = [];

  courses.forEach(course => {
    course.meeting.forEach(meet => {
      if (notInArray(meet.room, rooms) && meet.room.match(/^[A-Z]\-/)) {
        rooms.push(meet.room);
      }
    });
  });

  return rooms.sort();
}

export default getRooms();
