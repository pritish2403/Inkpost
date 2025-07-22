import React, { useState, CSSProperties } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import { motion } from 'framer-motion';

const genres = ['Tech', 'Lifestyle', 'Travel', 'Food', 'Other'];

type StyleMap = {
  [key: string]: CSSProperties;
};

const styles: StyleMap = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    background: 'radial-gradient(ellipse at top, #f0f4ff, #e0e7ff)',
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    maxWidth: '64rem',
    background: 'rgba(255, 255, 255, 0.75)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
    borderRadius: '1.5rem',
    overflow: 'hidden',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
  },
  infoPanel: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    padding: '2.5rem',
    background: 'linear-gradient(to bottom right, #c7d2fe, #a5b4fc)',
    textAlign: 'center',
    color: '#1e293b',
  },
  formPanel: {
    width: '50%',
    padding: '3rem',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  formTitle: {
    fontSize: '1.875rem',
    fontWeight: 700,
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: '1.5rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  input: {
    width: '100%',
    backgroundColor: '#f1f5f9',
    color: '#0f172a',
    border: '1px solid #cbd5e1',
    padding: '0.75rem',
    borderRadius: '0.75rem',
    outline: 'none',
    transition: 'border 0.2s ease',
  },
  textarea: {
    minHeight: '180px',
    resize: 'vertical',
  },
  select: {
    width: '100%',
    backgroundColor: '#f1f5f9',
    color: '#0f172a',
    border: '1px solid #cbd5e1',
    padding: '0.75rem',
    borderRadius: '0.75rem',
    outline: 'none',
  },
  submitButton: {
    width: '100%',
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '0.75rem 0',
    borderRadius: '0.75rem',
    fontWeight: 600,
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  submitButtonHover: {
    backgroundColor: '#2563eb',
  },
  disabledButton: {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
};

const CreateBlog = () => {
  const { token } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [genre, setGenre] = useState('');
  const [loading, setLoading] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!genre) {
      showToast('Please choose a genre', 'error');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content, genre }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Blog creation failed');

      showToast('Blog created!', 'success');
      setTitle('');
      setContent('');
      setGenre('');
      setTimeout(() => navigate(`/blog/${data._id}`), 1500);
    } catch (err: any) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Left Panel */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          style={styles.infoPanel}
        >
          <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>Write a New Blog 📝</h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.5 }}>
            Share your thoughts, stories or tips with the world. Your voice matters!
          </p>
        </motion.div>

        {/* Right Panel */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          style={styles.formPanel}
        >
          <h2 style={styles.formTitle}>Create a Blog</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="text"
              style={styles.input}
              placeholder="Blog Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <textarea
              style={{ ...styles.input, ...styles.textarea }}
              placeholder="Write your content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />

            <select
              style={styles.select}
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              required
            >
              <option value="" disabled>
                Choose genre
              </option>
              {genres.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>

            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.submitButton,
                ...(isButtonHovered && !loading ? styles.submitButtonHover : {}),
                ...(loading ? styles.disabledButton : {}),
              }}
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
            >
              {loading ? 'Creating...' : 'Post Blog 📨'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateBlog;
