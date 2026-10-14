import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';

// only authenticated users can reach the home(wrapped) page
export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/" replace />;
}
