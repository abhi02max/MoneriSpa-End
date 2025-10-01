import React, { useState } from 'react';
import { apiService } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const AdminLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const { data } = await apiService.post('/auth/login', { username, password });
      localStorage.setItem('adminInfo', JSON.stringify(data));
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    handleSubmit(e);
  };

  return (
    <div className="admin-wrapper">
      <div className="login-panel">
        <h1 className="brand-heading">Moneri</h1>
        <p className="subtitle">Administrator Sign In</p>
        <form onSubmit={handleSubmit}>
          {error && (
            <ErrorMessage 
              message={error} 
              variant="error"
              style={{ marginBottom: '1rem' }}
            />
          )}
          <div className="form-group">
            <label>Username</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              disabled={loading}
            />
          </div>
          <button 
            type="submit" 
            className="btn" 
            style={{ width: '100%', marginTop: '1rem' }}
            onClick={handleButtonClick}
            disabled={loading}
          >
            {loading ? <LoadingSpinner size="small" text="Signing In..." /> : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};
export default AdminLoginPage;