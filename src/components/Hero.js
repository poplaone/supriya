import React, { useEffect, useRef, useState } from 'react';
import './Hero.css';

const Hero = () => {
  const txtRow1Ref = useRef(null);
  const txtRow2Ref = useRef(null);
  const txtRow3Ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      return mobileRegex.test(navigator.userAgent) || window.innerWidth <= 767;
    };
    
    setIsMobile(checkIsMobile());
    
    // Add resize listener to update on screen size changes
    const handleResize = () => {
      setIsMobile(checkIsMobile());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Check browser video support
  const checkVideoSupport = () => {
    const video = document.createElement('video');
    const supportsMp4 = video.canPlayType('video/mp4');
    const supportsMov = video.canPlayType('video/quicktime');
    return { supportsMp4, supportsMov };
  };

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

  return (
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
                  <img
                    className="hero-video-mobile"
                    alt="mobile hero"
                    src={`${process.env.PUBLIC_URL || ''}/logo192.png`}
                    style={{ objectFit: 'contain', backgroundColor: '#000' }}
                  />
                  <div className="video-error-message">
                    Video failed to load. Using image fallback.
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
                  poster={`${process.env.PUBLIC_URL || ''}/logo192.png`}
                  onError={() => {
                    console.error('Mobile hero video failed to load');
                    setVideoError(true);
                  }}
                  onLoadedData={() => {
                    console.log('Mobile hero video loaded successfully');
                    setVideoLoaded(true);
                  }}
                >
                  <source src={`${process.env.PUBLIC_URL || ''}/assets/videos/hero video mobile only.mp4`} type="video/mp4" />
                  <source src={`${process.env.PUBLIC_URL || ''}/assets/videos/hero video mobile only.mov`} type="video/quicktime" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          </div>
        ) : (
          /* Desktop: Grid layout with clip-path effects */
          <div style={{width: '80%'}} className="hero-img-grid">
            {/* First video mask */}
            <div 
              style={{
                clipPath: 'polygon(37% 100%, 44% 100%, 37% 0%, 60% 0%, 66% 100%, 70% 100%, 67% 0%, 97% 0%, 100% 100%, 0% 100%, 0% 0%, 14% 0%, 16% 100%, 20% 100%, 19% 0%, 34% 0%)',
                webkitClipPath: 'polygon(37% 100%, 44% 100%, 37% 0%, 60% 0%, 66% 100%, 70% 100%, 67% 0%, 97% 0%, 100% 100%, 0% 100%, 0% 0%, 14% 0%, 16% 100%, 20% 100%, 19% 0%, 34% 0%)'
              }} 
              className="hero-mask is-1st"
            >
              <div 
                data-poster-url="./assets/videos/hero video.mov"
                data-video-urls="./assets/videos/hero video.mov"
                data-autoplay="true" 
                data-loop="true" 
                data-wf-ignore="true" 
                id="video-1" 
                className="hero-bg-video w-background-video w-background-video-atom"
              >
                <video 
                  id="643c9872-68de-12fe-23ee-90ff82abe4bb-video" 
                  autoPlay 
                  loop 
                  style={{
                    backgroundImage: 'url("./assets/videos/hero video.mov")'
                  }}
                  muted 
                  playsInline 
                  data-wf-ignore="true" 
                  data-object-fit="cover"
                >
                  <source src="./assets/videos/hero video.mov" data-wf-ignore="true" type="video/mp4" />
                </video>
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
                data-poster-url="./assets/videos/hero video 2.mov"
                data-video-urls="./assets/videos/hero video 2.mov"
                data-autoplay="true" 
                data-loop="true" 
                data-wf-ignore="true" 
                id="video-2" 
                className="hero-bg-video is-2 w-node-e92ba675-dd4a-f58c-a760-beedcb871fc8-386a10f1 w-background-video w-background-video-atom"
              >
                <video 
                  id="e92ba675-dd4a-f58c-a760-beedcb871fc8-video" 
                  autoPlay 
                  loop 
                  style={{
                    backgroundImage: 'url("./assets/videos/hero video 2.mov")'
                  }}
                  muted 
                  playsInline 
                  data-wf-ignore="true" 
                  data-object-fit="cover"
                >
                  <source src="./assets/videos/hero video 2.mov" data-wf-ignore="true" type="video/mp4" />
                </video>
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
                data-poster-url="./assets/videos/hero video.mov"
                data-video-urls="./assets/videos/hero video.mov"
                data-autoplay="true" 
                data-loop="true" 
                data-wf-ignore="true" 
                id="video-3" 
                className="hero-bg-video is-3 w-node-_54226774-b13f-322b-2cc2-5133f5d2f2a8-386a10f1 w-background-video w-background-video-atom"
              >
                <video 
                  id="54226774-b13f-322b-2cc2-5133f5d2f2a8-video" 
                  autoPlay 
                  loop 
                  style={{
                    backgroundImage: 'url("./assets/videos/hero video.mov")'
                  }}
                  muted 
                  playsInline 
                  data-wf-ignore="true" 
                  data-object-fit="cover"
                >
                  <source src="./assets/videos/hero video.mov" data-wf-ignore="true" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        )}
        
        <div className="container">
          <div className="hero-icon-div">
            <img 
              src="./assets/67464b37c005049376e9c992_Asset 29.svg" 
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
                Votre <span className="inria-highlight">réalité</span>
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
                façonne
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
                notre <span className="inria-highlight">créativité</span>
              </div>
            </div>
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Hero;