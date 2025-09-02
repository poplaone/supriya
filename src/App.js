import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedProjects from './components/FeaturedProjects';
import CTA from './components/CTA';
import Footer from './components/Footer';
import PhotoPage from './components/PhotoPage';

function App() {
  return (
    <Router>
      <div className="App">
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
  );
}

export default App;