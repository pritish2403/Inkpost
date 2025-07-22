import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  content: string;
  imageUrl?: string;
  genre: string;
  authorId: Types.ObjectId;
  createdAt: Date;
}

const BlogSchema = new Schema<IBlog>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: { type: String },
  genre: { type: String, required: true },
  authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IBlog>('Blog', BlogSchema); 