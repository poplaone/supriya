import React, { createContext, useContext, useRef, useEffect } from 'react';

const AudioContext = createContext();

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};

export const AudioProvider = ({ children }) => {
  const audioRefs = useRef({
    home: null,
    photo: null
  });
  
  const currentAudio = useRef(null);
  const unlockAttached = useRef(false);

  // Attach a one-time user-interaction handler to unlock autoplay
  const setupAutoplayUnlock = () => {
    if (unlockAttached.current) return;
    unlockAttached.current = true;

    const resume = () => {
      resumeAudio();
    };

    // Use once:true so listeners remove themselves automatically
    window.addEventListener('click', resume, { once: true });
    window.addEventListener('touchstart', resume, { once: true, passive: true });
    window.addEventListener('keydown', resume, { once: true });
  };

  // Initialize audio elements
  useEffect(() => {
    // Create audio elements using absolute paths from public to work on all routes
    const baseUrl = process.env.PUBLIC_URL || '';
    audioRefs.current.home = new Audio(`${baseUrl}/assets/music/video page audio.mp3`);
    audioRefs.current.photo = new Audio(`${baseUrl}/assets/music/photo page audio.mp3`);
    
    // Set properties for better user experience
    audioRefs.current.home.loop = true;
    audioRefs.current.photo.loop = true;
    audioRefs.current.home.volume = 0.7;
    audioRefs.current.photo.volume = 0.7;
    audioRefs.current.home.preload = 'auto';
    audioRefs.current.photo.preload = 'auto';
    
    // Handle audio loading errors
    audioRefs.current.home.onerror = () => {
      console.error('Error loading home page audio');
    };
    
    audioRefs.current.photo.onerror = () => {
      console.error('Error loading photo page audio');
    };
    
    // Cleanup on unmount
    return () => {
      if (audioRefs.current.home) {
        audioRefs.current.home.pause();
        audioRefs.current.home = null;
      }
      if (audioRefs.current.photo) {
        audioRefs.current.photo.pause();
        audioRefs.current.photo = null;
      }
    };
  }, []);

  const playAudio = (page) => {
    // Stop current audio if playing
    if (currentAudio.current) {
      currentAudio.current.pause();
      currentAudio.current.currentTime = 0;
    }
    
    // Play new audio
    if (audioRefs.current[page]) {
      currentAudio.current = audioRefs.current[page];
      audioRefs.current[page].play().catch(error => {
        console.log('Audio play prevented by browser policy:', error);
        setupAutoplayUnlock();
      });
    }
  };

  const stopAudio = () => {
    if (currentAudio.current) {
      currentAudio.current.pause();
      currentAudio.current.currentTime = 0;
      currentAudio.current = null;
    }
  };

  const pauseAudio = () => {
    if (currentAudio.current) {
      currentAudio.current.pause();
    }
  };

  const resumeAudio = () => {
    if (currentAudio.current) {
      currentAudio.current.play().catch(error => {
        console.log('Audio play prevented by browser policy:', error);
      });
    }
  };

  return (
    <AudioContext.Provider value={{ playAudio, stopAudio, pauseAudio, resumeAudio }}>
      {children}
    </AudioContext.Provider>
  );
};