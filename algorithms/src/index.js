// if an element is in the array
function isUnique(element, arr) {
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

function getDetails() {
  const courses = require('../data/details.json');
  const rooms = [];

  courses.forEach(course => {
    course.meeting.forEach(meet => {
      if (isUnique(meet.room, rooms) && meet.room.match(/^[A-Z]\-/)) {
        rooms.push({
          name: '',
          day: {
            M: [],
            T: [],
            W: [],
            H: [],
            F: [],
          },
        });

        const last = rooms.length - 1;
        rooms[last].name = meet.room;
        // push time tuple to "day" array
        rooms[last][meet.day].push(meet.time);
      }
    });
  });
}

console.log(getRooms());
console.log(getDetails());
