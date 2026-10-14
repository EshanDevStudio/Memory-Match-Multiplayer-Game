import { useState } from 'react';
import { useAuth } from '../auth/AuthContext.jsx';
import { secureApi } from '../api/authApi.js';
import { getErrorMessage } from '../api/axiosClient.js';

export default function HomePage() {
  const { username } = useAuth();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');



  // call a secure endpoint (token by axios interceptor)
  async function callSecureEndpoint() {
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const { data } = await secureApi.hello();
      setResult(typeof data === 'string' ? data : JSON.stringify(data, null, 2));
    } catch (err) {
      setError(
        err.response?.status === 403
          ? 'You do not have permission to call this endpoint.'
          : getErrorMessage(err)
      );
    } finally {
      setLoading(false);
    }
  }



  return (
    <div className="home">
      <header className="topbar">
        <span className="brand">ASDF</span>
        <div className="topbar-right">
          <span className="muted">Signed in as <strong>{username || 'user'}</strong></span>
          <button className="btn btn-secondary btn-small">Log out</button>
        </div>
      </header>

      <main className="home-main">
        <h1>Home</h1>

        <section className="panel">
          <h2>Secure API check:</h2>
          <button className="btn btn-primary btn-inline" onClick={callSecureEndpoint} disabled={loading}>
            {loading ? 'Calling…' : 'Call secure endpoint'}
          </button>

          {result && <pre className="result" role="status">{result}</pre>}
          {error && <div className="alert alert-error" role="alert">{error}</div>}
          


        </section>
      </main>
    </div>
  );
}
