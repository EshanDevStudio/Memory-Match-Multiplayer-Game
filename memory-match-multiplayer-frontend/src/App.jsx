import { Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import WelcomePage from "./pages/WelcomePage"; 


function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App
