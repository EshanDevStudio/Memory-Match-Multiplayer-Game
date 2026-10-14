import { Route, Routes, Navigate } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import WelcomePage from "./pages/WelcomePage"; 
import HomePage from "./pages/HomePage";
import ProtectedRoute from './auth/ProtectedRoute.jsx';


function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App
