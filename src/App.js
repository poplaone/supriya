import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedProjects from './components/FeaturedProjects';
import CTA from './components/CTA';
import Footer from './components/Footer';
import PhotoPage from './components/PhotoPage';
import { AudioProvider, useAudio } from './components/AudioContext';
import AboutSpace from './components/AboutSpace';

// Component to handle audio playback based on current route
const AudioController = () => {
  const { playAudio } = useAudio();
  const location = useLocation();
  const isInitialRender = React.useRef(true);
  const hasPlayedInitialAudio = React.useRef(false);

  useEffect(() => {
    // Play home audio immediately on first load if on home page
    if (isInitialRender.current) {
      isInitialRender.current = false;
      // Play home audio immediately when site loads on home page
      if (location.pathname === '/') {
        playAudio('home');
        hasPlayedInitialAudio.current = true;
      }
      return;
    }

    // Play appropriate page-specific audio based on current page
    if (location.pathname === '/') {
      playAudio('home');
    } else if (location.pathname === '/photo') {
      playAudio('photo');
    } else {
      playAudio('background'); // Just play background audio on other pages
    }
  }, [location, playAudio]);

  return null;
};

function App() {
  return (
    <HelmetProvider>
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
              <Route path="/about-space" element={<AboutSpace />} />
            </Routes>
          </div>
        </Router>
      </AudioProvider>
    </HelmetProvider>
  );
}

export default App;