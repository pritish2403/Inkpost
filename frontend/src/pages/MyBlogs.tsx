import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { motion } from 'framer-motion';

interface Blog {
  _id: string;
  title: string;
  genre: string;
  imageUrl?: string;
  createdAt: string;
}

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    display: 'flex',
    minHeight: '100vh',
    background: 'linear-gradient(to right, #b3cde0, #fefbd8)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '30px',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    padding: '30px',
    width: '100%',
    maxWidth: '900px',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
  },
  header: {
    textAlign: 'center',
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '30px',
  },
  filter: {
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
  },
  select: {
    padding: '10px 15px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    background: '#fff',
    color: '#333',
    fontWeight: 500,
    cursor: 'pointer',
  },
  blogCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  blogImage: {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  blogContent: {
    flex: 1,
  },
  blogTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#222',
  },
  blogMeta: {
    color: '#666',
    fontSize: '14px',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  button: {
    padding: '8px 16px',
    borderRadius: '6px',
    fontWeight: 600,
    border: 'none',
    cursor: 'pointer',
    textAlign: 'center',
    transition: '0.2s',
  },
  editBtn: {
    backgroundColor: '#4f46e5',
    color: '#fff',
  },
  deleteBtn: {
    backgroundColor: '#dc2626',
    color: '#fff',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#555',
  },
};

const MyBlogs = () => {
  const { token } = useAuth();
  const { showToast } = useToast();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState<string>('All');

  const fetchBlogs = () => {
    setLoading(true);
    fetch('/api/blogs/user/blogs', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        setBlogs(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBlogs();
    // eslint-disable-next-line
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Delete failed');
      showToast('Blog deleted!', 'success');
      setBlogs(blogs.filter(b => b._id !== id));
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const uniqueGenres = ['All', ...Array.from(new Set(blogs.map(blog => blog.genre)))];

  const filteredBlogs = selectedGenre === 'All'
    ? blogs
    : blogs.filter(blog => blog.genre === selectedGenre);

  return (
    <div style={styles.page}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={styles.card}
      >
        <div style={styles.header}>My Blogs</div>

        <div style={styles.filter}>
          <label style={{ fontWeight: 500, color: '#444' }}>Filter by Genre:</label>
          <select
            value={selectedGenre}
            onChange={e => setSelectedGenre(e.target.value)}
            style={styles.select}
          >
            {uniqueGenres.map((genre, idx) => (
              <option key={idx} value={genre}>{genre}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <div style={styles.emptyText}>Loading your blogs...</div>
        ) : filteredBlogs.length === 0 ? (
          <div style={styles.emptyText}>No blogs found for the selected genre.</div>
        ) : (
          <div>
            {filteredBlogs.map(blog => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                style={styles.blogCard}
              >
                {blog.imageUrl && (
                  <img src={blog.imageUrl} alt="thumb" style={styles.blogImage} />
                )}
                <div style={styles.blogContent}>
                  <div style={styles.blogTitle}>{blog.title}</div>
                  <div style={styles.blogMeta}>Genre: {blog.genre}</div>
                  <div style={styles.blogMeta}>
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div style={styles.buttons}>
                  <Link to={`/edit/${blog._id}`}>
                    <button style={{ ...styles.button, ...styles.editBtn }}>Edit</button>
                  </Link>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    style={{ ...styles.button, ...styles.deleteBtn }}
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default MyBlogs;
