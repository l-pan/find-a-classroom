import Room from './Room';
import RoomNames from './RoomNames';
import { findRoom, toMinute } from './helpers';

const courses = require('../data/details.json');
const rooms = RoomNames.map(name => new Room(name));

courses.forEach(course => {
  course.meeting.forEach(meet => {
    const index = findRoom(meet.room, rooms);

    console.log(rooms);

    if (meet.day.length === 1) {
      rooms[index].reduce(meet.day, meet.time.map(i => toMinute(i)));
    } else {
      meet.day.split('').forEach(day => {
        rooms[index].reduce(day, meet.time.map(i => toMinute(i)));
      });
    }
  });
});
