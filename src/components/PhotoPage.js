import React, { useEffect, useRef, useState } from 'react';
import './PhotoPage.css';
import { useAudio } from './AudioContext';

const PhotoPage = () => {
  const { playAudio } = useAudio();
  
  // Animation refs for scroll-triggered animations
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  
  // Refs for manual swipe functionality
  const carouselRef = useRef(null);
  const trackRef = useRef(null);
  
  // State for manual swipe
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [prevTranslateX, setPrevTranslateX] = useState(0);
  // Removed unused animationID state
  
  // Modal state for photo popup
  const [modalImage, setModalImage] = useState(null);
  const [modalTitle, setModalTitle] = useState('');

  // Play photo page audio when component mounts
  useEffect(() => {
    playAudio('photo');
    
    // Cleanup function to stop audio when component unmounts
    return () => {
      // Audio will be stopped by the AudioController when navigating away
    };
  }, [playAudio]);

  // Handle photo click
  const handlePhotoClick = (imageSrc, title) => {
    setModalImage(imageSrc);
    setModalTitle(title);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  // Close modal
  const closeModal = () => {
    setModalImage(null);
    setModalTitle('');
    document.body.style.overflow = 'auto'; // Restore scrolling
  };

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    if (modalImage) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [modalImage]);

  // Manual swipe functions
  const touchStart = (e) => {
    const touch = e.touches[0];
    setStartX(touch.clientX);
    setStartY(touch.clientY);
    setIsDragging(true);
  };

  const touchMove = (e) => {
    if (!isDragging || !carouselRef.current) return;
    
    const touch = e.touches[0];
    const currentX = touch.clientX;
    const currentY = touch.clientY;
    
    // Check if vertical scroll is more significant than horizontal
    const deltaX = Math.abs(currentX - startX);
    const deltaY = Math.abs(currentY - startY);
    
    // If vertical scroll is more significant, don't prevent default
    if (deltaY > deltaX) {
      return;
    }
    
    // Prevent default only for horizontal swiping
    e.preventDefault();
    
    const newTranslateX = prevTranslateX + currentX - startX;
    setTranslateX(newTranslateX);
  };

  const touchEnd = () => {
    if (!carouselRef.current) return;
    
    setIsDragging(false);
    
    // Calculate velocity to determine if we should snap
    const movedBy = translateX - prevTranslateX;
    
    // Get actual card width and margin
    const cardElement = document.querySelector('.card-item');
    if (!cardElement) return;
    
    const cardStyles = window.getComputedStyle(cardElement);
    const cardWidth = cardElement.offsetWidth;
    const cardMarginRight = parseInt(cardStyles.marginRight);
    const totalCardWidth = cardWidth + cardMarginRight;
    
    // Calculate how many cards we should move based on drag distance
    const cardsToMove = Math.round(movedBy / totalCardWidth);
    
    // Calculate new position
    const newTranslate = prevTranslateX + (cardsToMove * totalCardWidth);
    
    // Limit movement to prevent going too far
    const maxTranslate = 0;
    const minTranslate = -((images.section2.length * 2 - Math.floor(carouselRef.current.offsetWidth / totalCardWidth)) * totalCardWidth);
    const clampedTranslate = Math.max(minTranslate, Math.min(maxTranslate, newTranslate));
    
    setTranslateX(clampedTranslate);
    setPrevTranslateX(clampedTranslate);
  };

  // Mouse events for desktop
  const mouseDown = (e) => {
    setStartX(e.clientX);
    setIsDragging(true);
    
    // Add event listeners for mouse move and up
    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
  };

  const mouseMove = (e) => {
    if (!isDragging || !carouselRef.current) return;
    
    const currentX = e.clientX;
    const newTranslateX = prevTranslateX + currentX - startX;
    setTranslateX(newTranslateX);
  };

  const mouseUp = () => {
    if (!carouselRef.current) return;
    
    setIsDragging(false);
    document.removeEventListener('mousemove', mouseMove);
    document.removeEventListener('mouseup', mouseUp);
    
    // Snap logic similar to touchEnd
    const movedBy = translateX - prevTranslateX;
    
    // Get actual card width and margin
    const cardElement = document.querySelector('.card-item');
    if (!cardElement) return;
    
    const cardStyles = window.getComputedStyle(cardElement);
    const cardWidth = cardElement.offsetWidth;
    const cardMarginRight = parseInt(cardStyles.marginRight);
    const totalCardWidth = cardWidth + cardMarginRight;
    
    // Calculate how many cards we should move based on drag distance
    const cardsToMove = Math.round(movedBy / totalCardWidth);
    
    // Calculate new position
    const newTranslate = prevTranslateX + (cardsToMove * totalCardWidth);
    
    // Limit movement to prevent going too far
    const maxTranslate = 0;
    const minTranslate = -((images.section2.length * 2 - Math.floor(carouselRef.current.offsetWidth / totalCardWidth)) * totalCardWidth);
    const clampedTranslate = Math.max(minTranslate, Math.min(maxTranslate, newTranslate));
    
    setTranslateX(clampedTranslate);
    setPrevTranslateX(clampedTranslate);
  };

  useEffect(() => {
    // Enhanced Intersection Observer for better scroll-triggered animations
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px',
      threshold: [0, 0.1, 0.2, 0.3, 0.5]
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
          // Add animation class with a slight delay for better effect
          setTimeout(() => {
            entry.target.classList.add('animate-in');
          }, 100);
          
          // Animate individual items within sections
          const animateItems = entry.target.querySelectorAll(
            '.masonry-item, .card-item, .hero-photo-mask'
          );
          
          animateItems.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add('item-animate-in');
            }, 200 + (index * 150)); // Staggered animation
          });
        }
      });
    }, observerOptions);

    // Observe all sections
    [section1Ref, section2Ref, section3Ref].forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  // High-quality images for each section
  const images = {
    section1: [
      { src: './assets/images/visual stories 1.webp', title: 'Visual Story 1' },
      { src: './assets/images/visual stories 2.webp', title: 'Visual Story 2' },
      { src: './assets/images/visual stories 3.webp', title: 'Visual Story 3' },
      { src: './assets/images/visual stories 4.webp', title: 'Visual Story 4' }
    ],
    section2: [
      { src: './assets/images/infinite prespectives 1.webp', title: 'Infinite Perspective 1' },
      { src: './assets/images/infinite prespectives 2.webp', title: 'Infinite Perspective 2' },
      { src: './assets/images/infinite prespectives 3.webp', title: 'Infinite Perspective 3' },
      { src: './assets/images/infinite prespectives 4.webp', title: 'Infinite Perspective 4' },
      { src: './assets/images/infinite prespectives 5.webp', title: 'Infinite Perspective 5' },
      { src: './assets/images/infinite prespectives 6.webp', title: 'Infinite Perspective 6' },
      { src: './assets/images/infinite prespectives 7.webp', title: 'Infinite Perspective 7' },
      { src: './assets/images/infinite prespectives 8.webp', title: 'Infinite Perspective 8' },
      { src: './assets/images/infinite prespectives 9.webp', title: 'Infinite Perspective 9' },
      { src: './assets/images/infinite prespectives 10.webp', title: 'Infinite Perspective 10' }
    ],
    section3: [
      { src: './assets/images/Through the lens 1.webp', title: 'Through the Lens 1' },
      { src: './assets/images/Through the lens 2.webp', title: 'Through the Lens 2' },
      { src: './assets/images/Through the lens 3.webp', title: 'Through the Lens 3' },
      { src: './assets/images/Through the lens 4.webp', title: 'Through the Lens 4' }
    ]
  };

  return (
    <div className="photo-page">
      {/* Section 1: Masonry Grid Carousel */}
      <section ref={section1Ref} className="section photo-section photo-section--masonry">
        <div className="section-padding">
          <div className="container">
            <div className="photo-section-header">
              <h1 className="h-xx-large">
                Visual <span className="inria-highlight">stories</span>
              </h1>
              <p className="txt-x-large">Captured moments in time</p>
            </div>
            
            <div className="masonry-grid">
              {images.section1.map((image, index) => (
                <div 
                  key={index} 
                  className={`masonry-item masonry-item--${index + 1}`}
                  onClick={() => handlePhotoClick(image.src, image.title)}
                >
                  <img src={image.src} alt={image.title} className="masonry-img" />
                  <div className="masonry-overlay">
                    <span className="masonry-number">0{index + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Sliding Cards Carousel */}
      <section ref={section2Ref} className="section photo-section photo-section--cards">
        <div className="section-padding">
          <div className="container">
            <div className="photo-section-header">
              <h2 className="h-xx-large">
                Infinite <span className="inria-highlight">perspectives</span>
              </h2>
              <p className="txt-x-large">Every frame tells a story</p>
            </div>
            
            <div 
              className="cards-carousel"
              ref={carouselRef}
              onTouchStart={touchStart}
              onTouchMove={touchMove}
              onTouchEnd={touchEnd}
              onMouseDown={mouseDown}
            >
              <div 
                className="cards-track"
                ref={trackRef}
                style={{
                  transform: `translateX(${translateX}px)`,
                  transition: isDragging ? 'none' : 'transform 0.3s ease-out'
                }}
              >
                {[...images.section2, ...images.section2].map((image, index) => (
                  <div 
                    key={index} 
                    className="card-item"
                    onClick={() => handlePhotoClick(image.src, image.title)}
                  >
                    <img src={image.src} alt={image.title} className="card-img" />
                    <div className="card-info">
                      <span className="card-title">Frame {String((index % images.section2.length) + 1).padStart(2, '0')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Clip-Path Hero Grid */}
      <section ref={section3Ref} className="section photo-section photo-section--hero">
        <div className="section-padding">
          <div className="container">
            <div className="photo-section-header">
              <h2 className="h-xx-large">
                Through the <span className="inria-highlight">lens</span>
              </h2>
              <p className="txt-x-large">Where reality meets art</p>
            </div>
            
            <div className="hero-photo-grid">
              {images.section3.map((image, index) => (
                <div 
                  key={index} 
                  className={`hero-photo-mask hero-photo-mask--${index + 1}`}
                  onClick={() => handlePhotoClick(image.src, image.title)}
                  style={{
                    clipPath: index === 0 
                      ? 'polygon(37% 100%, 44% 100%, 37% 0%, 60% 0%, 66% 100%, 70% 100%, 67% 0%, 97% 0%, 100% 100%, 0% 100%, 0% 0%, 14% 0%, 16% 100%, 20% 100%, 19% 0%, 34% 0%)'
                      : index === 1
                      ? 'polygon(48% 100%, 54% 100%, 42% 0%, 98% 0%, 100% 100%, 76% 100%, 61% 100%, 5% 100%, 0% 0%, 30% 0%)'
                      : index === 2
                      ? 'polygon(0% 0%, 17% 0%, 22% 100%, 28% 100%, 26% 0%, 46% 0%, 55% 100%, 60% 100%, 60% 0%, 100% 0%, 100% 100%, 1% 100%)'
                      : 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)'
                  }}
                >
                  <img src={image.src} alt={image.title} className="hero-photo-img" />
                </div>
              ))}
              
              <div className="hero-photo-icon">
                <img 
                  src="./assets/67464b37c005049376e9c992_Asset 29.svg" 
                  alt="" 
                  className="photo-icon rotating" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Full Width Image */}
      <section className="section photo-section photo-section--full-image">
        <div className="section-padding">
          <div className="container">
            <div className="full-image-container">
              <img 
                src="/assets/images/photo page footer image.jpeg" 
                alt="Full Width Display" 
                className="full-width-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Photo Modal */}
      {modalImage && (
        <div className="photo-modal" onClick={closeModal}>
          <div className="photo-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="photo-modal-close" onClick={closeModal}>×</button>
            <img src={modalImage} alt={modalTitle} className="photo-modal-image" />
            <div className="photo-modal-title">{modalTitle}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoPage;
