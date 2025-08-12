import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import MainApp from './pages/MainApp';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  // Check auth status on initial load and route changes
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    
    // Optional: Verify token validity with backend
    if (token) {
      verifyToken(token).catch(() => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      });
    }
  }, [location]);

  // Theme handling
  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    document.body.classList.toggle('dark', isDark);
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  // Token verification function
  const verifyToken = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/api/users/verify', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Invalid token');
      return true;
    } catch (error) {
      throw error;
    }
  };

  return (
    <Routes>
            <Route 
        path="/login" 
        element={
          !isAuthenticated ? (
            <Login onLogin={() => setIsAuthenticated(true)} />
          ) : (
            <Navigate to="/" replace />
          )
        } 
      />
      <Route 
        path="/" 
        element={
          isAuthenticated ? (
            <MainApp isDark={isDark} toggleTheme={toggleTheme} />
          ) : (
            <Navigate to="/login" state={{ from: location }} replace />
          )
        } 
      />
      <Route 
        path="/register" 
        element={
          !isAuthenticated ? (
            <Register onRegister={() => setIsAuthenticated(true)} />
          ) : (
            <Navigate to="/" replace />
          )
        } 
      />
    </Routes>
  );
}