import { Router } from 'express';
import { getRooms } from './rooms.controller';
const router = new Router();

router.route('/').get(getRooms);

export default router;
