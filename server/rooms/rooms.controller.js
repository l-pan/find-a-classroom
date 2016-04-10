export function getRooms(req, res) {
  res.json(require('../../static/data/room_time.json'));
}
