import express from 'express';
import { addUser, getUsers } from '../controllers/userController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', authenticateToken, getUsers)

router.post('/', addUser)

export default router;