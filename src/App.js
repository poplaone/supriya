import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedProjects from './components/FeaturedProjects';
import CTA from './components/CTA';
import Footer from './components/Footer';

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
    </div>
  );
}

export default App;