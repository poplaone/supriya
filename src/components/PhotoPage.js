import React, { useEffect, useRef, useState } from 'react';
import './PhotoPage.css';

const PhotoPage = () => {
  // Animation refs for scroll-triggered animations
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);
  
  // Refs for manual swipe functionality
  const carouselRef = useRef(null);
  const trackRef = useRef(null);
  
  // State for manual swipe
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [prevTranslateX, setPrevTranslateX] = useState(0);
  const [animationID, setAnimationID] = useState(null);
  
  // Modal state for photo popup
  const [modalImage, setModalImage] = useState(null);
  const [modalTitle, setModalTitle] = useState('');

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
    
    // Cancel animation if it's running
    if (animationID) {
      cancelAnimationFrame(animationID);
    }
  };

  const touchMove = (e) => {
    if (!isDragging) return;
    
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
    setIsDragging(false);
    
    // Calculate velocity to determine if we should snap
    const movedBy = translateX - prevTranslateX;
    
    // If moved enough or fast enough, snap to next/previous
    if (Math.abs(movedBy) > 50 || Math.abs(movedBy) > 10) {
      // Snap to nearest card
      const cardWidth = 250 + 32; // card width + margin
      const cardsToShow = Math.floor(carouselRef.current.offsetWidth / cardWidth);
      const cardsToMove = Math.round(translateX / cardWidth);
      
      // Limit movement to prevent going too far
      const maxTranslate = 0;
      const minTranslate = -((images.section2.length * 2 - cardsToShow) * cardWidth);
      const newTranslate = Math.max(minTranslate, Math.min(maxTranslate, prevTranslateX + (cardsToMove * cardWidth)));
      
      setTranslateX(newTranslate);
      setPrevTranslateX(newTranslate);
    } else {
      // Snap back to previous position
      setTranslateX(prevTranslateX);
    }
  };

  // Mouse events for desktop
  const mouseDown = (e) => {
    setStartX(e.clientX);
    setIsDragging(true);
    
    // Cancel animation if it's running
    if (animationID) {
      cancelAnimationFrame(animationID);
    }
    
    // Add event listeners for mouse move and up
    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
  };

  const mouseMove = (e) => {
    if (!isDragging) return;
    
    const currentX = e.clientX;
    const newTranslateX = prevTranslateX + currentX - startX;
    setTranslateX(newTranslateX);
  };

  const mouseUp = () => {
    setIsDragging(false);
    document.removeEventListener('mousemove', mouseMove);
    document.removeEventListener('mouseup', mouseUp);
    
    // Snap logic similar to touchEnd
    const movedBy = translateX - prevTranslateX;
    
    if (Math.abs(movedBy) > 50 || Math.abs(movedBy) > 10) {
      const cardWidth = 250 + 32; // card width + margin
      const cardsToShow = Math.floor(carouselRef.current.offsetWidth / cardWidth);
      const cardsToMove = Math.round(translateX / cardWidth);
      
      const maxTranslate = 0;
      const minTranslate = -((images.section2.length * 2 - cardsToShow) * cardWidth);
      const newTranslate = Math.max(minTranslate, Math.min(maxTranslate, prevTranslateX + (cardsToMove * cardWidth)));
      
      setTranslateX(newTranslate);
      setPrevTranslateX(newTranslate);
    } else {
      setTranslateX(prevTranslateX);
    }
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
            '.masonry-item, .card-item, .hero-photo-mask, .stack-layer'
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
    [section1Ref, section2Ref, section3Ref, section4Ref].forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  // High-quality images for each section
  const images = {
    section1: [
      { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', title: 'Mountain Peak' },
      { src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', title: 'Forest Path' },
      { src: 'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', title: 'Desert Dunes' },
      { src: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', title: 'Ocean Waves' }
    ],
    section2: [
      { src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', title: 'Coastal Cliffs' },
      { src: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', title: 'Northern Lights' },
      { src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', title: 'Misty Mountains' },
      { src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', title: 'Autumn Forest' }
    ],
    section3: [
      { src: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', title: 'Alpine Lake' },
      { src: 'https://images.unsplash.com/photo-1479030160180-b1860951d696?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', title: 'Canyon View' },
      { src: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', title: 'Rocky Shore' },
      { src: 'https://images.unsplash.com/photo-1469474968018-50d01698950b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', title: 'Golden Hour' }
    ],
    section4: [
      { src: 'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', title: 'Tropical Paradise' },
      { src: 'https://images.unsplash.com/photo-1464822759165-3d0126485e6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', title: 'Mountain Valley' },
      { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', title: 'Snowy Peaks' },
      { src: 'https://images.unsplash.com/photo-1485470733090-0aae1788d5af?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', title: 'Urban Landscape' }
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
                      <span className="card-title">Frame {String((index % 4) + 1).padStart(2, '0')}</span>
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

      {/* Section 4: Stacked Layers */}
      <section ref={section4Ref} className="section photo-section photo-section--stack">
        <div className="section-padding">
          <div className="container">
            <div className="photo-section-header">
              <h2 className="h-xx-large">
                Layered <span className="inria-highlight">dimensions</span>
              </h2>
              <p className="txt-x-large">Depth beyond the surface</p>
            </div>
            
            <div className="stack-carousel">
              {images.section4.map((image, index) => (
                <div 
                  key={index} 
                  className={`stack-layer stack-layer--${index + 1}`}
                  onClick={() => handlePhotoClick(image.src, image.title)}
                  style={{
                    '--layer-index': index,
                    zIndex: 4 - index
                  }}
                >
                  <img src={image.src} alt={image.title} className="stack-img" />
                  <div className="stack-number">{String(index + 1).padStart(2, '0')}</div>
                </div>
              ))}
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
