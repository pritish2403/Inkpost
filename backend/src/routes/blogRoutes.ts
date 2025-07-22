import express from 'express';
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  getUserBlogs,
  updateBlog,
  deleteBlog
} from '../controllers/blogController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', authMiddleware, createBlog);
router.get('/', getAllBlogs);
router.get('/:id', getBlogById);
router.get('/user/blogs', authMiddleware, getUserBlogs);
router.put('/:id', authMiddleware, updateBlog);
router.delete('/:id', authMiddleware, deleteBlog);

export default router; 