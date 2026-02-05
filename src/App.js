import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedProjects from './components/FeaturedProjects';
import CTA from './components/CTA';
import Footer from './components/Footer';
import { AudioProvider, useAudio } from './components/AudioContext';

// Lazy load pages
const PhotoPage = lazy(() => import('./components/PhotoPage'));
const AboutSpace = lazy(() => import('./components/AboutSpace'));

// Component to handle audio playback based on current route
const AudioController = () => {
  const { playAudio } = useAudio();
  const location = useLocation();
  const isInitialRender = React.useRef(true);

  useEffect(() => {
    // Play home audio immediately on first load if on home page
    if (isInitialRender.current) {
      isInitialRender.current = false;
      if (location.pathname === '/') {
        playAudio('home');
      }
      return;
    }

    // Play appropriate page-specific audio based on current page
    if (location.pathname === '/') {
      playAudio('home');
    } else if (location.pathname === '/photo') {
      playAudio('photo');
    } else {
      playAudio('background');
    }
  }, [location, playAudio]);

  return null;
};

// Loading component
const PageLoader = () => (
  <div style={{
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#000',
    color: '#fff'
  }}>
    <div className="loader">Loading...</div>
  </div>
);

// Page transition wrapper
const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
);

// Animated Routes component to use useLocation hook
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageWrapper>
            <Navbar />
            <main className="main">
              <div className="main-content">
                <Hero />
                <FeaturedProjects />
                <CTA />
              </div>
            </main>
            <Footer />
          </PageWrapper>
        } />

        <Route path="/photo" element={
          <Suspense fallback={<PageLoader />}>
            <PageWrapper>
              <PhotoPage />
            </PageWrapper>
          </Suspense>
        } />

        <Route path="/about-space" element={
          <Suspense fallback={<PageLoader />}>
            <PageWrapper>
              <AboutSpace />
            </PageWrapper>
          </Suspense>
        } />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <HelmetProvider>
      <AudioProvider>
        <Router>
          <div className="App">
            <AudioController />
            <AnimatedRoutes />
          </div>
        </Router>
      </AudioProvider>
    </HelmetProvider>
  );
}

export default App;