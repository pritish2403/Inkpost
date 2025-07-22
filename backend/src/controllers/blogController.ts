import { Request, Response } from 'express';
import Blog from '../models/Blog';
import { AuthRequest } from '../middleware/authMiddleware';

export const createBlog = async (req: AuthRequest, res: Response) => {
  try {
    const { title, content, imageUrl, genre } = req.body;
    if (!title || !content || !genre) {
      return res.status(400).json({ message: 'All fields except image are required' });
    }
    const blog = new Blog({
      title,
      content,
      imageUrl,
      genre,
      authorId: req.userId,
    });
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.find().populate('authorId', 'name email');
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getBlogById = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('authorId', 'name email');
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getUserBlogs = async (req: AuthRequest, res: Response) => {
  try {
    const blogs = await Blog.find({ authorId: req.userId });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateBlog = async (req: AuthRequest, res: Response) => {
  try {
    const blog = await Blog.findOneAndUpdate(
      { _id: req.params.id, authorId: req.userId },
      req.body,
      { new: true }
    );
    if (!blog) return res.status(404).json({ message: 'Blog not found or unauthorized' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteBlog = async (req: AuthRequest, res: Response) => {
  try {
    const blog = await Blog.findOneAndDelete({ _id: req.params.id, authorId: req.userId });
    if (!blog) return res.status(404).json({ message: 'Blog not found or unauthorized' });
    res.json({ message: 'Blog deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}; 