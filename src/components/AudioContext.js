import React, { createContext, useContext, useRef, useEffect, useCallback } from 'react';

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
  const resumeAllAudiosRef = useRef(() => {});
  const initialHomeAudioPlayed = useRef(false);

  // Attach a one-time user-interaction handler to unlock autoplay
  const setupAutoplayUnlock = useCallback(() => {
    if (unlockAttached.current) return;
    unlockAttached.current = true;

    const resume = () => {
      // call through ref to avoid dependency churn
      resumeAllAudiosRef.current();
    };

    // Use once:true so listeners remove themselves automatically
    window.addEventListener('click', resume, { once: true });
    window.addEventListener('touchstart', resume, { once: true, passive: true });
    window.addEventListener('keydown', resume, { once: true });
  }, []);

  // Initialize audio elements
  useEffect(() => {
    // snapshot refs/sets used in cleanup to satisfy exhaustive-deps
    const audiosSnapshot = currentAudios.current;
    const refsSnapshot = audioRefs.current;
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
    // Use muted autoplay strategy to satisfy browser policies, then unmute shortly after
    audioRefs.current.home.muted = true;
    audioRefs.current.photo.muted = true;
    audioRefs.current.background.muted = true;
    
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
    
    // Try to auto-start home audio on site load with more aggressive approach
    const tryPlayHomeAudio = () => {
      if (
        audioRefs.current.home &&
        !initialHomeAudioPlayed.current &&
        currentAudios.current.size === 0
      ) {
        // Try multiple approaches to play audio
        const playPromise = audioRefs.current.home.play();
        
        if (playPromise !== undefined) {
          playPromise.then(() => {
            currentAudios.current.add(audioRefs.current.home);
            initialHomeAudioPlayed.current = true;
            // Unmute shortly after to make it audible
            setTimeout(() => {
              if (audioRefs.current.home) {
                audioRefs.current.home.muted = false;
              }
            }, 300);
          }).catch((error) => {
            console.log('Home autoplay prevented by browser policy:', error);
            setupAutoplayUnlock();
          });
        } else {
          // Fallback for older browsers
          try {
            audioRefs.current.home.play();
            currentAudios.current.add(audioRefs.current.home);
            initialHomeAudioPlayed.current = true;
            // Unmute shortly after to make it audible
            setTimeout(() => {
              if (audioRefs.current.home) {
                audioRefs.current.home.muted = false;
              }
            }, 300);
          } catch (error) {
            console.log('Home autoplay failed:', error);
            setupAutoplayUnlock();
          }
        }
      }
    };
    
    // Try to play immediately
    tryPlayHomeAudio();
    
    // Also try after a short delay to improve chances
    const initialPlayTimeout = setTimeout(tryPlayHomeAudio, 500);
    
    // Also try after user interaction if needed
    const userInteractionHandler = () => {
      if (!initialHomeAudioPlayed.current) {
        tryPlayHomeAudio();
      }
      // Remove event listeners after first successful play
      if (initialHomeAudioPlayed.current) {
        document.removeEventListener('click', userInteractionHandler);
        document.removeEventListener('touchstart', userInteractionHandler);
        document.removeEventListener('keydown', userInteractionHandler);
      }
    };
    
    // Add event listeners for user interaction
    document.addEventListener('click', userInteractionHandler);
    document.addEventListener('touchstart', userInteractionHandler, { passive: true });
    document.addEventListener('keydown', userInteractionHandler);
    
    // Cleanup on unmount
    return () => {
      // Clear timeout
      clearTimeout(initialPlayTimeout);
      
      // Remove event listeners
      document.removeEventListener('click', userInteractionHandler);
      document.removeEventListener('touchstart', userInteractionHandler);
      document.removeEventListener('keydown', userInteractionHandler);
      
      // Stop all playing audios
      audiosSnapshot.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
      });
      audiosSnapshot.clear();
      
      // Clean up audio elements (null out refs correctly by key)
      Object.keys(refsSnapshot).forEach(key => {
        if (refsSnapshot[key]) {
          refsSnapshot[key] = null;
        }
      });
    };
  }, [setupAutoplayUnlock]);

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
      // ensure unmuted before play
      audioRefs.current.background.muted = false;
      audioRefs.current.background.play().catch(error => {
        console.log('Background audio play prevented by browser policy:', error);
        setupAutoplayUnlock();
      });
      currentAudios.current.add(audioRefs.current.background);
      return; // no page-specific audio in this call
    }

    // Play new page-specific audio
    if (audioRefs.current[page] && page !== 'background') {
      // ensure unmuted before play
      audioRefs.current[page].muted = false;
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

  const resumeAllAudios = useCallback(() => {
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
  }, []);

  // Keep the ref pointing to the latest resumeAllAudios implementation
  useEffect(() => {
    resumeAllAudiosRef.current = resumeAllAudios;
  }, [resumeAllAudios]);

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