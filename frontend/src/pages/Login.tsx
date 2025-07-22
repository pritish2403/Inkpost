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
  passwordContainer: {
    position: 'relative',
    width: '100%',
  },
  eyeIcon: {
    position: 'absolute',
    top: '50%',
    right: '0.75rem',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    fontSize: '1.2rem',
  },
  submitButton: {
    width: '100%',
    backgroundColor: '#8b5cf6',
    color: 'white',
    padding: '0.75rem 0',
    borderRadius: '0.75rem',
    fontWeight: 600,
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  submitButtonHover: {
    backgroundColor: '#7c3aed',
  },
  disabledButton: {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
  registerPrompt: {
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    textAlign: 'center',
    color: '#64748b',
    marginTop: '1.5rem',
  },
  registerLink: {
    color: '#8b5cf6',
    fontWeight: 500,
    cursor: 'pointer',
    textDecoration: 'underline',
  },
};

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      showToast('Login successful!', 'success');
      navigate('/');
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
            <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              Welcome Back!
            </h2>
            <p style={{ fontSize: '1.125rem', marginBottom: '1.5rem' }}>
              Log in to continue exploring Platform ✍️
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
          <h2 style={styles.formTitle}>Login to Your Account</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="email"
              style={styles.input}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div style={styles.passwordContainer}>
              <input
                type={showPassword ? 'text' : 'password'}
                style={styles.input}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? '🙈' : '👁'}
              </span>
            </div>

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
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p style={styles.registerPrompt}>
            Don&apos;t have an account?{' '}
            <span onClick={() => navigate('/register')} style={styles.registerLink}>
              Sign up
            </span>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
