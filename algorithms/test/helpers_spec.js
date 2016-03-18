import { expect } from 'chai';
import { toMinute, findRoom } from '../src/helpers';

import Room from '../src/Room';
import RoomNames from '../src/RoomNames';

describe('Helpers', () => {
  describe('toMinute function', () => {
    it('should be converted to minutes', () => {
      expect(toMinute('10:00')).to.equal(600);
    });
  });

  describe('findRoom function', () => {
    const rooms = RoomNames.map(i => new Room(i));

    it('should find room', () => {
      RoomNames.forEach((name, i) => expect(findRoom(name, rooms)).to.equal(i));
    });
  });
});
