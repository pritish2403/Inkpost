import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import CreateBlog from './pages/CreateBlog';
import BlogDetail from './pages/BlogDetail';
import MyBlogs from './pages/MyBlogs';
import NotFound from './pages/NotFound';
import EditBlog from './pages/EditBlog';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import { ToastProvider } from './context/ToastContext';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <AuthProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Register />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/create" element={<ProtectedRoute><CreateBlog /></ProtectedRoute>} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="/my-blogs" element={<ProtectedRoute><MyBlogs /></ProtectedRoute>} />
              <Route path="/edit/:id" element={<ProtectedRoute><EditBlog /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </AuthProvider>
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;
