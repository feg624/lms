import express from 'express';
import { getUsersHandler } from '../controllers/user.controller';

const router = express.Router();

// Get users
router.get('/', getUsersHandler);

export default router;
