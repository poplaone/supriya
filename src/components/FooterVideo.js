import React, { useRef, useEffect } from 'react';
import './FooterVideo.css';

const FooterVideo = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    
    if (video) {
      // Set up video properties
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      
      // Try to play the video
      const playVideo = () => {
        video.play().catch(error => {
          console.log('Footer video autoplay failed:', error);
        });
      };
      
      // Play video when component mounts
      playVideo();
      
      // Play video on user interaction if autoplay failed
      const handleUserInteraction = () => {
        playVideo();
        document.removeEventListener('touchstart', handleUserInteraction);
        document.removeEventListener('click', handleUserInteraction);
      };
      
      document.addEventListener('touchstart', handleUserInteraction);
      document.addEventListener('click', handleUserInteraction);
      
      // Clean up event listeners
      return () => {
        document.removeEventListener('touchstart', handleUserInteraction);
        document.removeEventListener('click', handleUserInteraction);
      };
    }
  }, []);

  return (
    <div className="footer-video-container">
      <video
        ref={videoRef}
        className="footer-video"
        preload="auto"
        muted
        loop
        playsInline
      >
        <source 
          src={`${process.env.PUBLIC_URL || ''}/assets/videos/footer video.mp4`} 
          type="video/mp4" 
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default FooterVideo;