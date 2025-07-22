import React, { useEffect, useState, CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Blog {
  _id: string;
  title: string;
  genre: string;
  imageUrl?: string;
  authorId: { name: string; email: string };
}

type StyleCollection = {
  [key: string]: CSSProperties;
};

const styles: StyleCollection = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    background: 'radial-gradient(ellipse at top, #f0f4ff, #e0e7ff)',
    padding: '2rem',
  },
  title: {
    fontSize: '2.25rem',
    fontWeight: 800,
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#1e293b',
  },
  filter: {
    marginBottom: '1.5rem',
    alignSelf: 'center',
    padding: '0.5rem',
    borderRadius: '0.5rem',
    border: '1px solid #cbd5e1',
    fontSize: '1rem',
  },
  grid: {
    display: 'grid',
    gap: '2rem',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.75)',
    padding: '1.25rem',
    borderRadius: '1.5rem',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    textDecoration: 'none',
    color: 'inherit',
  },
  cardHover: {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 40px rgba(0,0,0,0.1)',
  },
  image: {
    width: '8rem',
    height: '8rem',
    objectFit: 'cover',
    borderRadius: '0.75rem',
    border: '1px solid #cbd5e1',
  },
  blogInfo: {
    flex: 1,
  },
  blogTitle: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#1e293b',
    marginBottom: '0.25rem',
  },
  blogGenre: {
    color: '#2563eb',
    fontWeight: 600,
    marginBottom: '0.25rem',
  },
  blogAuthor: {
    fontSize: '0.875rem',
    color: '#64748b',
  },
};

const Home = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [genres, setGenres] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/blogs')
      .then(res => res.json())
      .then(data => {
        setBlogs(data);
        const genreList: string[] = Array.from(new Set(data.map((blog: Blog) => blog.genre))) as string[];
        setGenres(genreList);
        setLoading(false);
      });
  }, []);

  const filteredBlogs = selectedGenre === 'all' ? blogs : blogs.filter(blog => blog.genre === selectedGenre);

  if (loading) return <div style={{ textAlign: 'center', marginTop: '3rem' }}>Loading blogs...</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>All Blogs</h1>

      <select
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
        style={styles.filter}
      >
        <option value="all">All Genres</option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>{genre}</option>
        ))}
      </select>

      <div style={styles.grid}>
        {filteredBlogs.map(blog => (
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            key={blog._id}
          >
            <Link to={`/blog/${blog._id}`} style={styles.card}>
              {blog.imageUrl && <img src={blog.imageUrl} alt="thumb" style={styles.image} />}
              <div style={styles.blogInfo}>
                <div style={styles.blogTitle}>{blog.title}</div>
                <div style={styles.blogGenre}>Genre: {blog.genre}</div>
                <div style={styles.blogAuthor}>By {blog.authorId?.name || 'Unknown'}</div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Home;
