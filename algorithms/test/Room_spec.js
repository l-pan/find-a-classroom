import { expect } from 'chai';
import Room from '../src/Room';

describe('a room', () => {
  it('availibility should update', () => {
    // initialize a room with name 'A-211'
    const myRoom = new Room('A-211');

    // have a class from 8 AM to 9 AM on Monday
    myRoom.reduce('M', [480, 540]);

    expect(myRoom.time.M).to.deep.equal([
      [0, 480],
      [540, 1440],
    ]);
  });

  it('availability should update with multiple reduces', () => {
    // initialize a room with name 'A-211'
    const myRoom = new Room('A-211');

    myRoom.reduce('T', [480, 540]);
    myRoom.reduce('T', [100, 140]);
    myRoom.reduce('T', [900, 1000]);

    expect(myRoom.time.T).to.deep.equal([
      [0, 100],
      [140, 480],
      [540, 900],
      [1000, 1440],
    ]);
  });

  it('should remove the entire interval if it is the same as the one compared to', () => {
    // initialize a room with name 'A-211'
    const myRoom = new Room('A-211');

    myRoom.reduce('T', [480, 540]);
    myRoom.reduce('T', [100, 140]);
    myRoom.reduce('T', [140, 480]);

    expect(myRoom.time.T).to.deep.equal([
      [0, 100],
      [540, 1440],
    ]);
  });

  it('should avoid duplicated time', () => {
    // initialize a room with name 'A-211'
    const myRoom = new Room('A-211');

    myRoom.reduce('F', [480, 540]);
    myRoom.reduce('F', [480, 540]);
    myRoom.reduce('F', [100, 140]);
    myRoom.reduce('F', [900, 1000]);
    myRoom.reduce('F', [480, 540]);

    expect(myRoom.time.F).to.deep.equal([
      [0, 100],
      [140, 480],
      [540, 900],
      [1000, 1440],
    ]);
  });
});
