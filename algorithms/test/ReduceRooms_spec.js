import { expect } from 'chai';

import reduceRoom from '../src/ReduceRooms';
import Room from '../src/Room';
const courses = require('../data/details.json');

describe('reduceRoom', () => {
  it('A-104 Monday should be reduced', () => {
    const rooms = [new Room('A-104')];
    reduceRoom(rooms, courses);

    expect(rooms[0].time.M).to.deep.equal([
      [945, 1095],
    ]);
  });
});

