import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedProjects from './components/FeaturedProjects';
import CTA from './components/CTA';
import Footer from './components/Footer';
import PhotoPage from './components/PhotoPage';
import { AudioProvider, useAudio } from './components/AudioContext';

// Component to handle audio playback based on current route
const AudioController = () => {
  const { playAudio, stopAudio } = useAudio();
  const location = useLocation();

  useEffect(() => {
    // Play appropriate audio based on current page
    if (location.pathname === '/') {
      playAudio('home');
    } else if (location.pathname === '/photo') {
      playAudio('photo');
    } else {
      stopAudio();
    }

    // Cleanup when component unmounts or location changes
    return () => {
      // Audio will be stopped when new page audio starts
    };
  }, [location, playAudio, stopAudio]);

  return null;
};

function App() {
  return (
    <AudioProvider>
      <Router>
        <div className="App">
          <AudioController />
          <Routes>
            <Route path="/" element={
              <>
                <Navbar />
                <main className="main">
                  <div className="main-content">
                    <Hero />
                    <FeaturedProjects />
                    <CTA />
                  </div>
                </main>
                <Footer />
              </>
            } />
            <Route path="/photo" element={<PhotoPage />} />
          </Routes>
        </div>
      </Router>
    </AudioProvider>
  );
}

export default App;