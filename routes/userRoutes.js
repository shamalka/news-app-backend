import express from 'express';
import { addUser, getUsers } from '../controllers/userController.js';

const router = express.Router();

router.get('/users', getUsers)

router.post('/users', addUser)

export default router;