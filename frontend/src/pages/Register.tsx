import React, { useState, CSSProperties } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import { motion } from 'framer-motion';

type StyleCollection = {
  [key: string]: CSSProperties;
};

const styles: StyleCollection = {
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
  welcomePanel: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    color: '#1e293b',
    padding: '2.5rem',
    textAlign: 'center',
    background: 'linear-gradient(to bottom right, #c7d2fe, #a5b4fc)',
  },
  formPanel: {
    width: '50%',
    padding: '3rem',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  formTitle: {
    fontSize: '1.875rem',
    lineHeight: '2.25rem',
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
  loginPrompt: {
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    textAlign: 'center',
    color: '#64748b',
    marginTop: '1.5rem',
  },
  loginLink: {
    color: '#3b82f6',
    fontWeight: 500,
    cursor: 'pointer',
    textDecoration: 'underline',
  },
};

const Register = () => {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(name, email, password);
      showToast('Registration successful! Please login.', 'success');
      setTimeout(() => navigate('/login'), 1500);
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
        <div style={styles.welcomePanel}>
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center' }}
          >
            <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Welcome!</h2>
            <p style={{ fontSize: '1.125rem', marginBottom: '1.5rem' }}>
              Join us and explore something fresh ✍️
            </p>
          </motion.div>
        </div>

        {/* Right Panel (Form) */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          style={styles.formPanel}
        >
          <h2 style={styles.formTitle}>Create an Account</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="text"
              style={styles.input}
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              style={styles.input}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              style={styles.input}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
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
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>

          <p style={styles.loginPrompt}>
            Already have an account?{' '}
            <span onClick={() => navigate('/login')} style={styles.loginLink}>
              Log in
            </span>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
