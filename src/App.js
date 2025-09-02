import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedProjects from './components/FeaturedProjects';
import CTA from './components/CTA';
import Footer from './components/Footer';
import Slideshow from './components/Slideshow';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main className="main">
        <div className="main-content">
          <Hero />
          <FeaturedProjects />
          <CTA />
        </div>
      </main>
      <Footer />
      <Slideshow />
    </div>
  );
}

export default App;