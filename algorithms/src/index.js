import fs from 'fs';
import path from 'path';

import Room from './Room';
import RoomNames from './RoomNames';
import reduceRoom from './ReduceRooms';

const courses = require('../data/details.json');
const rooms = RoomNames.map(name => new Room(name));

reduceRoom(rooms, courses);

const outputPath = path.join(__dirname, '..', 'output', 'room_time.json');

fs.writeFile(outputPath, JSON.stringify(rooms, null, 2), 'utf-8');
