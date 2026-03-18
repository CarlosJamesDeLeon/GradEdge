import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Auth from './pages/Auth';
import CampusFeed from './pages/CampusFeed';
import Marketplace from './pages/Marketplace';
import Mentorship from './pages/Mentorship';

function App() {
  // Simulate authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <Router>
      <Routes>
        <Route 
          path="/auth" 
          element={
            isAuthenticated ? 
            <Navigate to="/feed" /> : 
            <Auth onAuthSuccess={() => setIsAuthenticated(true)} />
          } 
          
        />
        
        {/* Protected routes wrapped in Layout */}
        <Route element={<Layout isAuthenticated={isAuthenticated} onLogout={() => setIsAuthenticated(false)} />}>
          <Route path="/" element={<Navigate to="/feed" replace />} />
          <Route path="/feed" element={<CampusFeed />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/mentorship" element={<Mentorship />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
