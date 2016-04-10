export default function (time, day, rooms, updateList) {
  const freeRooms = [];

  rooms.forEach(room => {
    room.time[day].forEach(timeSlot => {
      if (time >= timeSlot[0] && time <= timeSlot[1]) {
        freeRooms.push(Object.assign({}, room, { endTime: timeSlot[1] }));
      }
    });
  });

  if (freeRooms.length === 0) {
    return [];
  }

  // sort rooms according to remained time
  return freeRooms.
    map(freeRoom => {
      const remainedTime = freeRoom.endTime - time;

      if (remainedTime <= 0 && typeof updateList === 'function') {
        updateList();
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
}
