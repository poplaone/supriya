import React from 'react';
import './FooterVideo.css';
import VideoSmart from './VideoSmart';

const FooterVideo = () => {
  return (
    <div className="footer-video-container">
      <VideoSmart
        src={`${process.env.PUBLIC_URL || ''}/assets/videos/footer video.mp4`}
        preload="auto"
        muted={true}
        loop={true}
        className="footer-video"
      />
    </div>
  );
};

export default FooterVideo;