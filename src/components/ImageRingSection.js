import React from 'react';
import Draggable3DImageRing from './Draggable3DImageRing';

const ImageRingSection = () => {
  // Sample images - replace with your actual image URLs
  const images = [
    'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800',
    'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=800',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800',
    'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?auto=format&fit=crop&w=800',
  ];

  return (
    <section className="image-ring-section">
      <div className="image-ring-container">
        <div className="image-ring-title">
          <h2>Our Work</h2>
          <p>Explore our portfolio through this interactive 3D experience</p>
        </div>
        
        <div className="image-ring-wrapper">
          <Draggable3DImageRing
            images={images}
            width={400}
            imageDistance={300}
            perspective={1000}
            initialRotation={180}
            animationDuration={1}
            staggerDelay={0.1}
            hoverOpacity={0.3}
            mobileBreakpoint={768}
            mobileScaleFactor={0.7}
            draggable={true}
            containerClassName="image-ring-container-inner"
            ringClassName="image-ring-ring"
            imageClassName="image-ring-image"
            backgroundColor="transparent"
          />
        </div>
      </div>
    </section>
  );
};

export default ImageRingSection;