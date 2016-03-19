import { expect } from 'chai';
import Room from '../src/Room';

describe('a room', () => {
  it('availibility should update', () => {
    // initialize a room with name 'A-211'
    const myRoom = new Room('A-211');

    // have a class from 9 AM to 10 AM on Monday
    myRoom.reduce('M', [540, 600]);

    expect(myRoom.time.M).to.deep.equal([
      [495, 540],
      [600, 1095],
    ]);
  });

  it('availability should update with multiple reduces', () => {
    // initialize a room with name 'A-211'
    const myRoom = new Room('A-211');

    myRoom.reduce('T', [540, 600]);
    myRoom.reduce('T', [900, 1000]);

    expect(myRoom.time.T).to.deep.equal([
      [495, 540],
      [600, 900],
      [1000, 1095],
    ]);
  });

  it('should remove the entire interval if it is the same as the one compared to', () => {
    // initialize a room with name 'A-211'
    const myRoom = new Room('A-211');

    myRoom.reduce('H', [540, 600]);
    myRoom.reduce('H', [900, 1000]);
    myRoom.reduce('H', [600, 900]);

    expect(myRoom.time.H).to.deep.equal([
      [495, 540],
      [1000, 1095],
    ]);
  });

  it('should avoid duplicated time', () => {
    // initialize a room with name 'A-211'
    const myRoom = new Room('A-211');

    myRoom.reduce('T', [540, 600]);
    myRoom.reduce('T', [900, 1000]);
    myRoom.reduce('T', [900, 1000]);
    myRoom.reduce('T', [540, 600]);

    expect(myRoom.time.T).to.deep.equal([
      [495, 540],
      [600, 900],
      [1000, 1095],
    ]);
  });
});
