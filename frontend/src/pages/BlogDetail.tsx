import React, { useEffect, useState, CSSProperties } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Blog {
  _id: string;
  title: string;
  content: string;
  imageUrl?: string;
  genre: string;
  authorId: { name: string; email: string };
  createdAt: string;
}

type StyleCollection = {
  [key: string]: CSSProperties;
};

const styles: StyleCollection = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    background: 'radial-gradient(ellipse at top, #f0f4ff, #e0e7ff)',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    width: 'fit-content',
    maxWidth: '48rem',
    background: 'rgba(255, 255, 255, 0.85)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
    borderRadius: '1.5rem',
    overflow: 'hidden',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    padding: '2rem',
  },
  image: {
    width: '100%',
    maxHeight: '250px',
    objectFit: 'cover',
    borderRadius: '0.75rem',
    marginBottom: '1.5rem',
  },
  title: {
    fontSize: '1.875rem',
    fontWeight: 700,
    marginBottom: '0.75rem',
    color: '#1e293b',
  },
  meta: {
    fontSize: '0.875rem',
    color: '#64748b',
    marginBottom: '1.25rem',
  },
  content: {
    fontSize: '1.125rem',
    lineHeight: 1.75,
    color: '#1e293b',
    whiteSpace: 'pre-line',
  },
};

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`/api/blogs/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.message) setError(data.message);
        else setBlog(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch blog');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div style={styles.container}><div>Loading blog...</div></div>;
  if (error) return <div style={styles.container}><div style={{ color: 'red' }}>{error}</div></div>;
  if (!blog) return null;

  return (
    <div style={styles.container}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={styles.card}
      >
        {blog.imageUrl && <img src={blog.imageUrl} alt="Blog Cover" style={styles.image} />}

        <h1 style={styles.title}>{blog.title}</h1>

        <div style={styles.meta}>
          Genre: <strong>{blog.genre}</strong> | By <strong>{blog.authorId?.name || 'Unknown'}</strong> on{' '}
          {new Date(blog.createdAt).toLocaleDateString('en-GB')}
        </div>

        <div style={styles.content}>{blog.content}</div>
      </motion.div>
    </div>
  );
};

export default BlogDetail;
