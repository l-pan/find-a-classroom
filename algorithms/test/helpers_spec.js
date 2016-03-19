import { expect } from 'chai';
import { toMinute, findRoom, toTime } from '../src/helpers';

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

  describe('toTime function', () => {
    it('should convert minute to readable time', () => {
      expect(toTime(600)).to.equal('10:00');
    });

    it('should convert 1440 mins to 0:00', () => {
      expect(toTime(1440)).to.equal('0:00');
    });

    it('should convert 0 min to 00:00', () => {
      expect(toTime(1440)).to.equal('0:00');
    });
  });
});
