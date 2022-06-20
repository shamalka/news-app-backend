import express from 'express';
import { login, logout, authToken } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', login);

router.post('/token', authToken);

router.post('/logout', logout);

export default router;
