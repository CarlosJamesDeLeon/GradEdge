import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Auth from './pages/Auth';
import CampusFeed from './pages/CampusFeed';
import Marketplace from './pages/Marketplace';
import Mentorship from './pages/Mentorship';
import ProfessorRatings from './pages/ProfessorRatings';
import SubjectChat from './pages/SubjectChat';
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';
import StudyGroups from './pages/StudyGroups';

function App() {
  // Simulate authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <LandingPage 
              isAuthenticated={isAuthenticated} 
              onAuthSuccess={() => setIsAuthenticated(true)} 
            />
          } 
        />
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
          <Route path="/feed" element={<CampusFeed />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/mentorship" element={<Mentorship />} />
          <Route path="/professor-ratings" element={<ProfessorRatings />} />
          <Route path="/chat/:subjectId" element={<SubjectChat />} />
          <Route path="/study-groups" element={<StudyGroups />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
