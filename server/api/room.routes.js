import { Router } from 'express';
import * as PostController from './room.controller';
const router = new Router();

// Get all Posts
router.route('/getPosts').get(PostController.getPosts);

export default router;
