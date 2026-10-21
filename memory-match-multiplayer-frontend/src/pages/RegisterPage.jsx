import { useState } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext.jsx';
import { getErrorMessage } from '../api/axiosClient.js';

export default function RegisterPage() {
  const { register, isAuthenticated } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();


  if (isAuthenticated) return <Navigate to="/home" replace />;


  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (username.trim().length < 3) return setError('Username must be at least 3 characters.');
    if (password.length < 8) return setError('Password must be at least 8 characters.');
    if (password !== confirm) return setError('Passwords do not match.');

    setSubmitting(true);
    try {
      await register(username.trim(), password);
      navigate('/', { replace: true, state: { notice: 'Account created. Sign in to continue.' } });
    } catch (err) {
      setError(
        err.response?.status === 409
          ? 'That username is taken. Choose another one.'
          : getErrorMessage(err)
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="center-page">
      <div className="form-card">
        <h1>Create account</h1>
        <p className="muted">Pick a username and a password to get started.</p>

        {error && <div className="alert alert-error" role="alert">{error}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="reg-username">Username</label>
          <input
            id="reg-username"
            type="text"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label htmlFor="reg-password">Password</label>
          <input
            id="reg-password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span className="hint">At least 8 characters.</span>

          <label htmlFor="reg-confirm">Confirm password</label>
          <input
            id="reg-confirm"
            type="password"
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />

          <button className="btn btn-primary" type="submit" disabled={submitting}>
            {submitting ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <p className="switch">Already registered? <Link to="/">Sign in</Link></p>
      </div>
    </div>
  );
}
