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
    photo: null,
    background: null
  });
  
  const currentAudios = useRef(new Set()); // Use a Set to track multiple playing audios
  const unlockAttached = useRef(false);

  // Attach a one-time user-interaction handler to unlock autoplay
  const setupAutoplayUnlock = () => {
    if (unlockAttached.current) return;
    unlockAttached.current = true;

    const resume = () => {
      resumeAllAudios();
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
    audioRefs.current.background = new Audio(`${baseUrl}/assets/music/audio.mp3`);
    
    // Set properties for better user experience
    audioRefs.current.home.loop = true;
    audioRefs.current.photo.loop = true;
    audioRefs.current.background.loop = true;
    audioRefs.current.home.volume = 0.7;
    audioRefs.current.photo.volume = 0.7;
    audioRefs.current.background.volume = 0.5;
    audioRefs.current.home.preload = 'auto';
    audioRefs.current.photo.preload = 'auto';
    audioRefs.current.background.preload = 'auto';
    
    // Handle audio loading errors
    audioRefs.current.home.onerror = () => {
      console.error('Error loading home page audio');
    };
    
    audioRefs.current.photo.onerror = () => {
      console.error('Error loading photo page audio');
    };
    
    audioRefs.current.background.onerror = () => {
      console.error('Error loading background audio');
    };
    
    // Try to auto-start background audio on site load
    // Only start if NOTHING else is already playing to avoid double audio layers
    if (
      audioRefs.current.background &&
      currentAudios.current.size === 0 &&
      !currentAudios.current.has(audioRefs.current.background)
    ) {
      audioRefs.current.background.play().then(() => {
        currentAudios.current.add(audioRefs.current.background);
      }).catch((error) => {
        console.log('Background autoplay prevented by browser policy:', error);
        setupAutoplayUnlock();
      });
    }

    // Cleanup on unmount
    return () => {
      // Stop all playing audios
      currentAudios.current.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
      });
      currentAudios.current.clear();
      
      // Clean up audio elements (null out refs correctly by key)
      Object.keys(audioRefs.current).forEach(key => {
        if (audioRefs.current[key]) {
          audioRefs.current[key] = null;
        }
      });
    };
  }, []);

  const playAudio = (page) => {
    // Ensure background policy: start/resume only when explicitly requested (page === 'background')
    // Otherwise, we pause background to avoid overlapping with page-specific audio

    // Stop all page-specific audios first
    Object.keys(audioRefs.current).forEach(key => {
      if (key !== 'background' && audioRefs.current[key] && currentAudios.current.has(audioRefs.current[key])) {
        audioRefs.current[key].pause();
        audioRefs.current[key].currentTime = 0;
        currentAudios.current.delete(audioRefs.current[key]);
      }
    });
    
    // If page-specific audio requested, pause background to prevent double audio
    if (page !== 'background' && audioRefs.current.background && currentAudios.current.has(audioRefs.current.background)) {
      audioRefs.current.background.pause();
      currentAudios.current.delete(audioRefs.current.background);
    }

    // Play background audio only when explicitly asked
    if (page === 'background' && audioRefs.current.background && !currentAudios.current.has(audioRefs.current.background)) {
      audioRefs.current.background.play().catch(error => {
        console.log('Background audio play prevented by browser policy:', error);
        setupAutoplayUnlock();
      });
      currentAudios.current.add(audioRefs.current.background);
      return; // no page-specific audio in this call
    }

    // Play new page-specific audio
    if (audioRefs.current[page] && page !== 'background') {
      audioRefs.current[page].play().catch(error => {
        console.log('Audio play prevented by browser policy:', error);
        setupAutoplayUnlock();
      });
      currentAudios.current.add(audioRefs.current[page]);
    }
  };

  const stopAudio = () => {
    // Stop all page-specific audios
    Object.keys(audioRefs.current).forEach(key => {
      if (key !== 'background' && audioRefs.current[key] && currentAudios.current.has(audioRefs.current[key])) {
        audioRefs.current[key].pause();
        audioRefs.current[key].currentTime = 0;
        currentAudios.current.delete(audioRefs.current[key]);
      }
    });

    // Resume background audio if available and not already playing
    if (audioRefs.current.background && !currentAudios.current.has(audioRefs.current.background)) {
      audioRefs.current.background.play().catch(error => {
        console.log('Background audio play prevented by browser policy:', error);
        setupAutoplayUnlock();
      });
      currentAudios.current.add(audioRefs.current.background);
    }
  };

  const pauseAudio = () => {
    // Pause all audios
    currentAudios.current.forEach(audio => {
      audio.pause();
    });
  };

  const resumeAllAudios = () => {
    // Ensure background starts if it wasn't added due to autoplay block
    if (audioRefs.current.background && !currentAudios.current.has(audioRefs.current.background)) {
      audioRefs.current.background.play().then(() => {
        currentAudios.current.add(audioRefs.current.background);
      }).catch(error => {
        console.log('Background audio play prevented by browser policy (resume):', error);
      });
    }

    // Resume all currently tracked audios
    currentAudios.current.forEach(audio => {
      audio.play().catch(error => {
        console.log('Audio play prevented by browser policy:', error);
      });
    });
  };

  const stopAllAudios = () => {
    // Stop all audios
    currentAudios.current.forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
    currentAudios.current.clear();
  };

  return (
    <AudioContext.Provider value={{ playAudio, stopAudio, pauseAudio, resumeAllAudios, stopAllAudios }}>
      {children}
    </AudioContext.Provider>
  );
};