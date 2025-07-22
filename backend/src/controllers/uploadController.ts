import { Request, Response } from 'express';
import cloudinary from '../utils/cloudinary';

export const uploadImage = async (req: Request, res: Response) => {
  try {
    const { image } = req.body;
    if (!image) return res.status(400).json({ message: 'No image provided' });
    const result = await cloudinary.uploader.upload(image, {
      folder: 'blog-thumbnails',
    });
    res.json({ url: result.secure_url });
  } catch (err) {
    res.status(500).json({ message: 'Image upload failed' });
  }
}; 