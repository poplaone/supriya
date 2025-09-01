import React, { useEffect, useRef } from 'react';

const Hero = () => {
  const heroLogoRef = useRef(null);
  const txtRow1Ref = useRef(null);
  const txtRow2Ref = useRef(null);
  const txtRow3Ref = useRef(null);

  useEffect(() => {
    // Simple animations for hero elements
    if (heroLogoRef.current) {
      setTimeout(() => {
        heroLogoRef.current.style.opacity = '1';
        heroLogoRef.current.style.transform = 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)';
      }, 300);
    }

    if (txtRow1Ref.current) {
      setTimeout(() => {
        txtRow1Ref.current.style.transform = 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)';
      }, 600);
    }

    if (txtRow2Ref.current) {
      setTimeout(() => {
        txtRow2Ref.current.style.transform = 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)';
      }, 900);
    }

    if (txtRow3Ref.current) {
      setTimeout(() => {
        txtRow3Ref.current.style.transform = 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)';
      }, 1200);
    }
  }, []);

  return (
    <section className="section is-hero">
      <div className="hero-scroll-trigger"></div>
      <div className="section-padding is-hero">
        <div 
          ref={heroLogoRef}
          className="hero-logo"
        >
          <img 
            src="./assets/67462971155525ce2175cd47_Tungsten-Logo.svg" 
            loading="lazy" 
            alt="Tungsten Logo" 
            className="hero-logo-img" 
          />
          <div className="studio-txt"></div>
        </div>
        
        <div style={{width: '80%'}} className="hero-img-grid">
          <div 
            style={{clipPath: 'polygon(37% 100%, 44% 100%, 37% 0%, 60% 0%, 66% 100%, 70% 100%, 67% 0%, 97% 0%, 100% 100%, 0% 100%, 0% 0%, 14% 0%, 16% 100%, 20% 100%, 19% 0%, 34% 0%)'}} 
            className="hero-mask is-1st"
          >
            <div 
              data-poster-url="./assets/67d1b1a391cf1f032ef188db_946e2d6d-54a69664_2-poster-00001.jpg" 
              data-video-urls="https://cdn.prod.website-files.com/673266e1c5d7db0952b1cd54%2F67d1b1a391cf1f032ef188db_946e2d6d-54a69664_2-transcode.mp4,https://cdn.prod.website-files.com/673266e1c5d7db0952b1cd54%2F67d1b1a391cf1f032ef188db_946e2d6d-54a69664_2-transcode.webm"
              data-autoplay="true" 
              data-loop="true" 
              className="hero-bg-video w-background-video w-background-video-atom"
            >
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                style={{backgroundImage: 'url("./assets/67d1b1a391cf1f032ef188db_946e2d6d-54a69664_2-poster-00001.jpg")'}}
                data-object-fit="cover"
              >
                <source src="https://cdn.prod.website-files.com/673266e1c5d7db0952b1cd54%2F67d1b1a391cf1f032ef188db_946e2d6d-54a69664_2-transcode.mp4" />
                <source src="https://cdn.prod.website-files.com/673266e1c5d7db0952b1cd54%2F67d1b1a391cf1f032ef188db_946e2d6d-54a69664_2-transcode.webm" />
              </video>
            </div>
          </div>
          
          <div 
            style={{clipPath: 'polygon(48% 100%, 54% 100%, 42% 0%, 98% 0%, 100% 100%, 76% 100%, 61% 100%, 5% 100%, 0% 0%, 30% 0%)'}} 
            className="hero-mask is-2nd"
          >
            <div 
              data-poster-url="./assets/67d1b1a391cf1f032ef188db_946e2d6d-54a69664_2-poster-00001.jpg" 
              data-video-urls="https://cdn.prod.website-files.com/673266e1c5d7db0952b1cd54%2F67d1b1a391cf1f032ef188db_946e2d6d-54a69664_2-transcode.mp4,https://cdn.prod.website-files.com/673266e1c5d7db0952b1cd54%2F67d1b1a391cf1f032ef188db_946e2d6d-54a69664_2-transcode.webm"
              data-autoplay="true" 
              data-loop="true" 
              className="hero-bg-video is-2 w-node-e92ba675-dd4a-f58c-a760-beedcb871fc8-386a10f1 w-background-video w-background-video-atom"
            >
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                style={{backgroundImage: 'url("./assets/67d1b1a391cf1f032ef188db_946e2d6d-54a69664_2-poster-00001.jpg")'}}
                data-object-fit="cover"
              >
                <source src="https://cdn.prod.website-files.com/673266e1c5d7db0952b1cd54%2F67d1b1a391cf1f032ef188db_946e2d6d-54a69664_2-transcode.mp4" />
                <source src="https://cdn.prod.website-files.com/673266e1c5d7db0952b1cd54%2F67d1b1a391cf1f032ef188db_946e2d6d-54a69664_2-transcode.webm" />
              </video>
            </div>
          </div>
          
          <div 
            style={{clipPath: 'polygon(0% 0%, 17% 0%, 22% 100%, 28% 100%, 26% 0%, 46% 0%, 55% 100%, 60% 100%, 60% 0%, 100% 0%, 100% 100%, 1% 100%)'}} 
            className="hero-mask is-3rd"
          >
            <div 
              data-poster-url="./assets/67d1b1a391cf1f032ef188db_946e2d6d-54a69664_2-poster-00001.jpg" 
              data-video-urls="https://cdn.prod.website-files.com/673266e1c5d7db0952b1cd54%2F67d1b1a391cf1f032ef188db_946e2d6d-54a69664_2-transcode.mp4,https://cdn.prod.website-files.com/673266e1c5d7db0952b1cd54%2F67d1b1a391cf1f032ef188db_946e2d6d-54a69664_2-transcode.webm"
              data-autoplay="true" 
              data-loop="true" 
              className="hero-bg-video is-3 w-node-_54226774-b13f-322b-2cc2-5133f5d2f2a8-386a10f1 w-background-video w-background-video-atom"
            >
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                style={{backgroundImage: 'url("./assets/67d1b1a391cf1f032ef188db_946e2d6d-54a69664_2-poster-00001.jpg")'}}
                data-object-fit="cover"
              >
                <source src="https://cdn.prod.website-files.com/673266e1c5d7db0952b1cd54%2F67d1b1a391cf1f032ef188db_946e2d6d-54a69664_2-transcode.mp4" />
                <source src="https://cdn.prod.website-files.com/673266e1c5d7db0952b1cd54%2F67d1b1a391cf1f032ef188db_946e2d6d-54a69664_2-transcode.webm" />
              </video>
            </div>
          </div>
        </div>
        
        <div className="container">
          <div className="hero-icon-div">
            <img 
              src="./assets/67464b37c005049376e9c992_Asset 29.svg" 
              loading="lazy" 
              style={{
                transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(60deg) skew(0, 0)'
              }}
              alt="" 
              className="hero-icon" 
            />
          </div>
          
          <h1 className="hero-txt-div">
            <div className="txt-row is-1">
              <div 
                ref={txtRow1Ref}
                style={{
                  transform: 'translate3d(-6rem, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)'
                }}
                className="h-xx-large"
              >
                Votre <span className="inria-highlight">réalité</span>
              </div>
            </div>
            <div className="txt-row is-2">
              <div 
                ref={txtRow2Ref}
                style={{
                  transform: 'translate3d(8rem, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)'
                }}
                className="h-xx-large"
              >
                façonne
              </div>
            </div>
            <div className="txt-row is-3">
              <div 
                ref={txtRow3Ref}
                style={{
                  transform: 'translate3d(5rem, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)'
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