import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { IntelPage } from './components/IntelPage';

const AppContent: React.FC = () => {
  const navigate = useNavigate();

  const handleLaunch = () => {
    navigate('/app');
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <Routes>
      <Route path="/" element={<LandingPage onLaunch={handleLaunch} />} />
      <Route path="/app" element={<Dashboard onBack={handleBack} />} />
      <Route path="/intel" element={<IntelPage />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;