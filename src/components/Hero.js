import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SEO from './SEO';
import './Hero.css';
import VideoSmart from './VideoSmart';

const Hero = () => {
  const txtRow1Ref = useRef(null);
  const txtRow2Ref = useRef(null);
  const txtRow3Ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(true);
  const location = useLocation();

  // Scroll to features section
  const handleExploreClick = () => {
    const el = document.getElementById('features');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Set mounted state
  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      const isMobileDevice = mobileRegex.test(navigator.userAgent);
      const isSmallScreen = window.innerWidth <= 767;

      // More precise mobile detection - only consider it mobile if it's actually a mobile device
      // or if it's a very small screen (likely mobile)
      return isMobileDevice || (isSmallScreen && window.innerWidth <= 480);
    };

    setIsMobile(checkIsMobile());

    // Add resize listener to update on screen size changes
    const handleResize = () => {
      setIsMobile(checkIsMobile());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // We always use MP4 for mobile hero; no need for format detection.

  // Try to play video on mobile devices after user interaction
  useEffect(() => {
    if (isMobile && !videoError && isMounted) {
      const playVideoOnInteraction = () => {
        // Try to play the video after user interaction
        const videoElement = document.querySelector('.hero-video-mobile');
        if (videoElement && isMounted) {
          // Ensure the video is not paused before trying to play
          if (videoElement.paused) {
            videoElement.play().catch(error => {
              if (!isMounted) return;
              console.log('Auto-play prevented by browser:', error);
              // Set error state if video can't be played
              setVideoError(true);
            });
          }
        }

        // Remove event listeners after first interaction
        document.removeEventListener('touchstart', playVideoOnInteraction);
        document.removeEventListener('click', playVideoOnInteraction);
      };

      // Add event listeners for user interaction
      document.addEventListener('touchstart', playVideoOnInteraction);
      document.addEventListener('click', playVideoOnInteraction);

      // Cleanup
      return () => {
        document.removeEventListener('touchstart', playVideoOnInteraction);
        document.removeEventListener('click', playVideoOnInteraction);
      };
    }
  }, [isMobile, videoError, isMounted]);

  // Fallback timer for video loading
  useEffect(() => {
    if (isMobile && !videoError && !videoLoaded && isMounted) {
      const fallbackTimer = setTimeout(() => {
        if (!isMounted) return;
        console.log('Video loading timeout - showing fallback');
        setVideoError(true);
      }, 5000); // 5 second timeout

      return () => clearTimeout(fallbackTimer);
    }
  }, [isMobile, videoError, videoLoaded, isMounted]);

  useEffect(() => {
    // Simple animations for hero elements
    if (txtRow1Ref.current) {
      setTimeout(() => {
        txtRow1Ref.current.style.transform = 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)';
        txtRow1Ref.current.style.webkitTransform = 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)';
        txtRow1Ref.current.style.mozTransform = 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)';
        txtRow1Ref.current.style.msTransform = 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)';
      }, 600);
    }

    if (txtRow2Ref.current) {
      setTimeout(() => {
        txtRow2Ref.current.style.transform = 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)';
        txtRow2Ref.current.style.webkitTransform = 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)';
        txtRow2Ref.current.style.mozTransform = 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)';
        txtRow2Ref.current.style.msTransform = 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)';
      }, 900);
    }

    if (txtRow3Ref.current) {
      setTimeout(() => {
        txtRow3Ref.current.style.transform = 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)';
        txtRow3Ref.current.style.webkitTransform = 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)';
        txtRow3Ref.current.style.mozTransform = 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)';
        txtRow3Ref.current.style.msTransform = 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)';
      }, 1200);
    }
  }, []);

  // Preload images for fallback
  useEffect(() => {
    const preloadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = src;
      });
    };

    // Preload fallback image
    preloadImage(`${process.env.PUBLIC_URL || ''}/logo192.png`).catch(() => {
      console.warn('Fallback image failed to load');
    });
  }, []);

  // SEO data for the home page
  const seoData = {
    title: "Home",
    description: "Welcome to our creative space where quiet blooms in open environments. Explore our unique visual stories and projects.",
    keywords: ["creative agency", "visual stories", "photography", "creative projects"],
    image: `${process.env.PUBLIC_URL || ''}/assets/videos/hero video.mp4`,
    url: `${window.location.origin}${location.pathname}`
  };

  return (
    <>
      <SEO {...seoData} />
      <section
        tr-scrollflip-scrubend="bottom top"
        tr-scrollflip-scrubstart="top top"
        data-w-id="d88c5d37-75f3-1c81-bab9-687891d63a7c"
        className="section is-hero"
      >
        <div data-w-id="c6c07eb6-77ed-4095-e1d3-f8dbb31259f7" className="hero-scroll-trigger"></div>
        <div className="section-padding is-hero">

          {/* Mobile: Simple full-width video with 16:9 aspect ratio */}
          {isMobile ? (
            <div className="hero-video-wrapper">
              <div className="hero-video-container">
                {videoError ? (
                  <div className="hero-video-mobile-fallback">
                    <div className="video-error-message">
                      Video not supported on this device.
                    </div>
                  </div>
                ) : (
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="hero-video-mobile"
                    preload="auto"
                    onError={() => {
                      if (!isMounted) return;
                      console.error('Mobile hero video failed to load');
                      setVideoError(true);
                    }}
                    onLoadedData={() => {
                      if (!isMounted) return;
                      console.log('Mobile hero video loaded successfully');
                      setVideoLoaded(true);
                    }}
                    onCanPlay={() => {
                      if (!isMounted) return;
                      console.log('Mobile hero video can play');
                    }}
                    onLoadStart={() => {
                      if (!isMounted) return;
                      console.log('Mobile hero video load started');
                    }}
                  >
                    {/* Always use the MP4 for mobile hero */}
                    <source src={`${process.env.PUBLIC_URL || ''}/assets/videos/hero video mobile only.mp4`} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            </div>
          ) : (
            /* Desktop: Grid layout with clip-path effects */
            <div className="hero-img-grid">
              {/* First video mask */}
              <div
                style={{
                  clipPath: 'polygon(37% 100%, 44% 100%, 37% 0%, 60% 0%, 66% 100%, 70% 100%, 67% 0%, 97% 0%, 100% 100%, 0% 100%, 0% 0%, 14% 0%, 16% 100%, 20% 100%, 19% 0%, 34% 0%)',
                  webkitClipPath: 'polygon(37% 100%, 44% 100%, 37% 0%, 60% 0%, 66% 100%, 70% 100%, 67% 0%, 97% 0%, 100% 100%, 0% 100%, 0% 0%, 14% 0%, 16% 100%, 20% 100%, 19% 0%, 34% 0%)'
                }}
                className="hero-mask is-1st"
              >
                <div
                  data-poster-url={`${process.env.PUBLIC_URL || ''}/assets/videos/hero video.mp4`}
                  data-video-urls={`${process.env.PUBLIC_URL || ''}/assets/videos/hero video.mp4`}
                  data-autoplay="true"
                  data-loop="true"
                  data-wf-ignore="true"
                  id="video-1"
                  className="hero-bg-video w-background-video w-background-video-atom"
                >
                  <VideoSmart
                    src={`${process.env.PUBLIC_URL || ''}/assets/videos/hero video.mp4`}
                    poster={`${process.env.PUBLIC_URL || ''}/assets/videos/hero video.mp4`}
                    preload="auto"
                    muted={true}
                    loop={true}
                    className="hero-bg-video w-background-video w-background-video-atom"
                  />
                </div>
              </div>

              {/* Second video mask */}
              <div
                style={{
                  clipPath: 'polygon(48% 100%, 54% 100%, 42% 0%, 98% 0%, 100% 100%, 76% 100%, 61% 100%, 5% 100%, 0% 0%, 30% 0%)',
                  webkitClipPath: 'polygon(48% 100%, 54% 100%, 42% 0%, 98% 0%, 100% 100%, 76% 100%, 61% 100%, 5% 100%, 0% 0%, 30% 0%)'
                }}
                className="hero-mask is-2nd"
              >
                <div
                  data-poster-url={`${process.env.PUBLIC_URL || ''}/assets/videos/hero video 2.mp4`}
                  data-video-urls={`${process.env.PUBLIC_URL || ''}/assets/videos/hero video 2.mp4`}
                  data-autoplay="true"
                  data-loop="true"
                  data-wf-ignore="true"
                  id="video-2"
                  className="hero-bg-video is-2 w-node-e92ba675-dd4a-f58c-a760-beedcb871fc8-386a10f1 w-background-video w-background-video-atom"
                >
                  <VideoSmart
                    src={`${process.env.PUBLIC_URL || ''}/assets/videos/hero video 2.mp4`}
                    poster={`${process.env.PUBLIC_URL || ''}/assets/videos/hero video 2.mp4`}
                    preload="auto"
                    muted={true}
                    loop={true}
                    className="hero-bg-video is-2 w-node-e92ba675-dd4a-f58c-a760-beedcb871fc8-386a10f1 w-background-video w-background-video-atom"
                  />
                </div>
              </div>

              {/* Third video mask */}
              <div
                style={{
                  clipPath: 'polygon(0% 0%, 17% 0%, 22% 100%, 28% 100%, 26% 0%, 46% 0%, 55% 100%, 60% 100%, 60% 0%, 100% 0%, 100% 100%, 1% 100%)',
                  webkitClipPath: 'polygon(0% 0%, 17% 0%, 22% 100%, 28% 100%, 26% 0%, 46% 0%, 55% 100%, 60% 100%, 60% 0%, 100% 0%, 100% 100%, 1% 100%)'
                }}
                className="hero-mask is-3rd"
              >
                <div
                  data-poster-url={`${process.env.PUBLIC_URL || ''}/assets/videos/hero video.mp4`}
                  data-video-urls={`${process.env.PUBLIC_URL || ''}/assets/videos/hero video.mp4`}
                  data-autoplay="true"
                  data-loop="true"
                  data-wf-ignore="true"
                  id="video-3"
                  className="hero-bg-video is-3 w-node-_54226774-b13f-322b-2cc2-5133f5d2f2a8-386a10f1 w-background-video w-background-video-atom"
                >
                  <VideoSmart
                    src={`${process.env.PUBLIC_URL || ''}/assets/videos/hero video.mp4`}
                    poster={`${process.env.PUBLIC_URL || ''}/assets/videos/hero video.mp4`}
                    preload="auto"
                    muted={true}
                    loop={true}
                    className="hero-bg-video is-3 w-node-_54226774-b13f-322b-2cc2-5133f5d2f2a8-386a10f1 w-background-video w-background-video-atom"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="container">
            <div className="hero-icon-div">
              <img
                src={`${process.env.PUBLIC_URL || ''}/assets/67464b37c005049376e9c992_Asset 29.svg`}
                loading="lazy"
                style={{
                  transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(60deg) skew(0, 0)',
                  webkitTransform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(60deg) skew(0, 0)',
                  mozTransform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(60deg) skew(0, 0)',
                  msTransform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(60deg) skew(0, 0)'
                }}
                alt=""
                className="hero-icon"
              />
            </div>

            <h1 className="hero-txt-div">
              <div className="txt-row is-1">
                <div
                  ref={txtRow1Ref}
                  data-w-id="6a679413-c393-756c-fe0e-291d00dbe0ef"
                  style={{
                    transform: 'translate3d(-6rem, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',
                    webkitTransform: 'translate3d(-6rem, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',
                    mozTransform: 'translate3d(-6rem, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',
                    msTransform: 'translate3d(-6rem, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)'
                  }}
                  className="h-xx-large"
                >
                  Quiet blooms
                </div>
              </div>
              <div className="txt-row is-2">
                <div
                  ref={txtRow2Ref}
                  data-w-id="9d15373f-9c0a-abac-cf5c-c01b78a0e359"
                  style={{
                    transform: 'translate3d(8rem, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',
                    webkitTransform: 'translate3d(8rem, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',
                    mozTransform: 'translate3d(8rem, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',
                    msTransform: 'translate3d(8rem, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)'
                  }}
                  className="h-xx-large"
                >
                  in spaces
                </div>
              </div>
              <div className="txt-row is-3">
                <div
                  ref={txtRow3Ref}
                  data-w-id="5ce69aa7-bece-3717-d29d-6e7b653d03d9"
                  style={{
                    transform: 'translate3d(5rem, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',
                    webkitTransform: 'translate3d(5rem, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',
                    mozTransform: 'translate3d(5rem, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',
                    msTransform: 'translate3d(5rem, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)'
                  }}
                  className="h-xx-large"
                >
                  left open
                </div>
              </div>
            </h1>
          </div>
          {/* CTA: Explore Space with Social Media Icons */}
          <div className="hero-cta">
            <button
              type="button"
              className="hero-explore-btn"
              onClick={handleExploreClick}
              aria-label="Explore Space"
            >
              Explore Space
            </button>
            {/* Social Media Icons - Visible on all devices */}
            <div className="hero-social-icons">
              <a
                href="https://www.facebook.com/tsuelga"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-icon"
                aria-label="Facebook"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12C22 6.477 17.523 2 12 2C6.477 2 2 6.477 2 12C2 16.991 5.657 21.128 10.438 21.879V14.89H7.898V12H10.438V9.797C10.438 7.291 11.93 5.907 14.215 5.907C15.309 5.907 16.453 6.102 16.453 6.102V8.562H15.193C13.95 8.562 13.563 9.333 13.563 10.124V12H16.336L15.893 14.89H13.563V21.879C18.343 21.128 22 16.991 22 12Z" fill="white" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/supriiyasharma?igsh=MTRpMWp2NGQwemtzaQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-icon"
                aria-label="Instagram"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="20" height="20" rx="6" stroke="white" strokeWidth="2" />
                  <circle cx="17.5" cy="8.5" r="1.5" fill="white" />
                  <circle cx="12" cy="12" r="5" stroke="white" strokeWidth="2" />
                </svg>
              </a>
              <a
                href="https://www.snapchat.com/add/s-sharma08"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-icon"
                aria-label="Snapchat"
              >
                <svg width="24" height="24" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="white">
                  <path d="M31.49,12h1c.85.13,1.7.21,2.54.38a10.34,10.34,0,0,1,8.42,10.19c0,1.82-.12,3.64-.18,5.46,0,.61,0,.68.62.83a3.76,3.76,0,0,0,2.36-.33,2.37,2.37,0,0,1,1.95.07,1,1,0,0,1,.28,1.79,8,8,0,0,1-1.74,1c-.59.28-1.24.44-1.82.72a1.89,1.89,0,0,0-1,2.9,18.1,18.1,0,0,0,1.55,2.66,11.71,11.71,0,0,0,7.17,5,1,1,0,0,1,.62.37.66.66,0,0,1-.28.86,5.83,5.83,0,0,1-1.33.74c-1.1.34-2.22.61-3.35.84a1,1,0,0,0-.89.79c-.11.5-.24,1-.37,1.49s-.39.65-.93.6c-1.24-.12-2.48-.18-3.72-.27A5.29,5.29,0,0,0,39,49.08c-.82.55-1.62,1.11-2.46,1.63A8.52,8.52,0,0,1,32.22,52a9,9,0,0,1-5.43-1.71c-.8-.54-1.59-1.11-2.43-1.58a4.72,4.72,0,0,0-1.79-.62,15.79,15.79,0,0,0-4.7.22c-.49.1-.75-.08-.88-.59s-.27-1-.37-1.45-.4-.73-.94-.85c-1.27-.28-2.53-.63-3.77-1a2.75,2.75,0,0,1-1.05-.75.59.59,0,0,1,.38-1,8.4,8.4,0,0,0,1-.24c3.94-1.26,6.41-4,8-7.72a1.71,1.71,0,0,0-.89-2.4c-.67-.36-1.42-.55-2.11-.88a8.66,8.66,0,0,1-1.8-1,.94.94,0,0,1,.23-1.65,2.31,2.31,0,0,1,2-.16,3.93,3.93,0,0,0,2.41.35c.6-.15.64-.22.62-.83-.07-1.7-.19-3.39-.17-5.09a11.59,11.59,0,0,1,.37-3.33,10.33,10.33,0,0,1,7.64-7.12A28.42,28.42,0,0,1,31.49,12Z" stroke="white" strokeWidth="3" strokeLinecap="round" fill="white" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;