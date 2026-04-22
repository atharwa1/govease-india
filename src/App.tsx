import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { DocumentsDirectory } from './pages/DocumentsDirectory';
import { StatusTracker } from './pages/StatusTracker';
import { DocumentGuide } from './pages/DocumentGuide';
import { HelpFaq } from './pages/HelpFaq';
import { Feedback } from './pages/Feedback';
import { GliftyChatbot } from './components/GliftyChatbot';
import { ThemeProvider } from './context/ThemeContext';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
    <Router>
      <ScrollToTop />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/documents" element={<DocumentsDirectory />} />
            <Route path="/status" element={<StatusTracker />} />
            <Route path="/guides/:id" element={<DocumentGuide />} />
            <Route path="/guides" element={<DocumentsDirectory />} />
            <Route path="/help" element={<HelpFaq />} />
            <Route path="/feedback" element={<Feedback />} />
          </Routes>
        </main>
        <Footer />
        <GliftyChatbot />
      </div>
    </Router>
    </ThemeProvider>
  );
};

export default App;
