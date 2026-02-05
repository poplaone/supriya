import React, { useState, useEffect, useRef, useCallback } from 'react';

const VideoSmart = ({
  src,
  poster,
  className = '',
  muted = true,
  loop = true,
  preload = 'auto', // Default to auto for hero videos
  controls = false,
  style,
  lazy = false, // Set to true to enable lazy loading
  rootMargin = '200px',
  ...rest
}) => {
  const videoRef = useRef(null);
  const [hasError, setHasError] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(!lazy); // Load immediately if not lazy

  // Handle error
  const handleError = useCallback(() => {
    setHasError(true);
    console.warn('VideoSmart: Failed to load video', src);
  }, [src]);

  // Intersection Observer for lazy loading (only if lazy=true)
  useEffect(() => {
    if (!lazy || shouldLoad) return;

    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.unobserve(video);
          }
        });
      },
      {
        rootMargin,
        threshold: 0,
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [lazy, rootMargin, shouldLoad]);

  // Set up video element and autoplay
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src || !shouldLoad) return;

    // Set video properties
    video.src = src;
    if (poster) video.poster = poster;
    video.muted = muted;
    video.loop = loop;
    video.preload = 'auto';
    video.controls = controls;
    video.playsInline = true;

    // Add event listeners
    video.addEventListener('error', handleError);

    // Try to play the video
    const playVideo = async () => {
      try {
        await video.play();
      } catch (error) {
        console.warn('VideoSmart: Failed to autoplay video', error);
      }
    };

    // Play when ready
    if (video.readyState >= 3) {
      playVideo();
    } else {
      video.addEventListener('canplay', playVideo, { once: true });
    }

    // Clean up
    return () => {
      video.removeEventListener('error', handleError);
    };
  }, [src, poster, muted, loop, controls, handleError, shouldLoad]);

  if (hasError) {
    return (
      <div className={`video-error-container ${className}`} style={style}>
        <div className="video-error">
          Failed to load video
        </div>
      </div>
    );
  }

  return (
    <video
      ref={videoRef}
      className={`video-smart ${className}`}
      preload={shouldLoad ? 'auto' : 'none'}
      muted={muted}
      loop={loop}
      controls={controls}
      playsInline
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
        ...style
      }}
      {...rest}
    />
  );
};

export default VideoSmart;