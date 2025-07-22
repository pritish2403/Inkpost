import React, { useEffect, useState, CSSProperties } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import { motion } from 'framer-motion';

const genres = ['Tech', 'Lifestyle', 'Travel', 'Food', 'Other'];

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    background: 'radial-gradient(ellipse at top, #f0f4ff, #e0e7ff)',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.75)',
    borderRadius: '1.5rem',
    padding: '2rem',
    maxWidth: '640px',
    width: '100%',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1e293b',
    marginBottom: '1.5rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '0.75rem',
    borderRadius: '0.75rem',
    border: '1px solid #cbd5e1',
    backgroundColor: '#f8fafc',
    fontSize: '1rem',
    color: '#1e293b',
  },
  textarea: {
    minHeight: '200px',
    padding: '0.75rem',
    borderRadius: '0.75rem',
    border: '1px solid #cbd5e1',
    backgroundColor: '#f8fafc',
    fontSize: '1rem',
    color: '#1e293b',
  },
  select: {
    padding: '0.75rem',
    borderRadius: '0.75rem',
    border: '1px solid #cbd5e1',
    backgroundColor: '#f8fafc',
    fontSize: '1rem',
    color: '#1e293b',
  },
  image: {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '0.5rem',
  },
  button: {
    padding: '0.75rem',
    backgroundColor: '#3b82f6',
    color: 'white',
    borderRadius: '0.75rem',
    border: 'none',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

const EditBlog = () => {
  const { token } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [genre, setGenre] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/blogs/${id}`)
      .then(res => res.json())
      .then(data => {
        setTitle(data.title);
        setContent(data.content);
        setGenre(data.genre);
        setImageUrl(data.imageUrl || '');
        setLoading(false);
      })
      .catch(() => {
        showToast('Failed to fetch blog', 'error');
        setLoading(false);
      });
  }, [id, showToast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!genre) {
      showToast('Please choose a genre', 'error');
      return;
    }
    setSaving(true);

    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content, genre, imageUrl }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Blog update failed');

      showToast('Blog updated!', 'success');
      setTimeout(() => navigate(`/blog/${id}`), 1500);
    } catch (err: any) {
      showToast(err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={{ textAlign: 'center', marginTop: '4rem' }}>Loading blog...</div>;

  return (
    <div style={styles.container}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={styles.card}
      >
        <h1 style={styles.title}>Edit Blog</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
            required
          />
          <textarea
            placeholder="Write your content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={styles.textarea}
            required
          />
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            style={styles.select}
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
          {imageUrl && <img src={imageUrl} alt="Current" style={styles.image} />}
          <button type="submit" disabled={saving} style={styles.button}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default EditBlog;
