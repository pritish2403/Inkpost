import express from 'express';
import { uploadImage } from '../controllers/uploadController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', authMiddleware, uploadImage);

export default router; 