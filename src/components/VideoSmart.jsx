import React, { useState, useEffect, useRef, useCallback } from 'react';

const VideoSmart = ({
  src,
  poster,
  className = '',
  muted = true,
  loop = true,
  preload = 'auto',
  controls = false,
  style,
  ...rest
}) => {
  const videoRef = useRef(null);
  const [hasError, setHasError] = useState(false);

  // Handle error
  const handleError = useCallback(() => {
    setHasError(true);
    console.warn('VideoSmart: Failed to load video', src);
  }, [src]);

  // Set up video element and autoplay
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    // Set video properties
    video.src = src;
    video.poster = poster;
    video.muted = muted;
    video.loop = loop;
    video.preload = preload;
    video.controls = controls;
    video.playsInline = true;
    video.webkitPlaysInline = true;
    
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
    
    // Play immediately and then retry if needed
    playVideo();
    
    // Set up interval to ensure video keeps playing
    const interval = setInterval(() => {
      if (video.paused && !video.ended) {
        playVideo();
      }
    }, 1000);
    
    // Clean up
    return () => {
      video.removeEventListener('error', handleError);
      clearInterval(interval);
    };
  }, [src, poster, muted, loop, preload, controls, handleError]);

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
      preload={preload}
      muted={muted}
      loop={loop}
      controls={controls}
      playsInline
      webkitPlaysInline
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', ...style }}
      {...rest}
    />
  );
};

export default VideoSmart;