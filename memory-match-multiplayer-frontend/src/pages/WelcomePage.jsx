import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext.jsx';
import { getErrorMessage } from '../api/axiosClient.js';

export default function WelcomePage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);


  if (isAuthenticated) return <Navigate to="/home" replace />;

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(username.trim(), password);
      navigate('/home', { replace: true });
    } catch (err) {
      setError(
        err.response?.status === 401 || err.response?.status === 403
          ? 'Username or password is incorrect.'
          : getErrorMessage(err)
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="split">
      <aside className="split-art" aria-hidden="false">
        {/* welcome image */}
        <div className="art-caption">
          <h2>Welcome back to Game</h2>
          <p></p>
        </div>
      </aside>

      {/* login form */}
      <main className="split-form">
        <div className="form-card">
          <h1>Sign in</h1>
          <p className="muted">Enter your username and password to continue.</p>

          {error && <div className="alert alert-error" role="alert">{error}</div>}

          <form onSubmit={handleSubmit} noValidate>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button className="btn btn-primary" type="submit" disabled={submitting || !username || !password}>
              {submitting ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          {/* unregistered users */}
          <div className="divider"><span>New here?</span></div>
          <Link to="/register" className="btn btn-secondary">Create an account</Link>
        </div>
      </main>
    </div>
  );
}
