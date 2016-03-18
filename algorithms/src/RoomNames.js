// if an element is in the array
export function isUnique(element, arr) {
  if (!element) {
    return false;
  }

  for (let i = 0; i < arr.length; i++) {
    if (element === arr[i]) {
      return false;
    }
  }
  return true;
}

// return a list of unique room names
function getRooms() {
  const courses = require('../data/details.json');
  const rooms = [];

  courses.forEach(course => {
    course.meeting.forEach(meet => {
      if (isUnique(meet.room, rooms) && meet.room.match(/^[A-Z]\-/)) {
        rooms.push(meet.room);
      }
    });
  });

  return rooms.sort();
}

export const RoomNames = getRooms();
