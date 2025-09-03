import React, { useEffect } from 'react';
import VideoSmart from './VideoSmart';

const FeaturedProjects = () => {
  const projects = [
    {
      id: 1,
      title: "Stillness Within Motion",
      client: "",
      type: "",
      video: `${process.env.PUBLIC_URL || ''}/assets/videos/video 1.mp4`
    },
    {
      id: 2,
      title: "Echoes Of Self",
      client: "",
      type: "",
      video: `${process.env.PUBLIC_URL || ''}/assets/videos/video 2.mp4`
    },
    {
      id: 3,
      title: "Moments Between Breaths",
      client: "",
      type: "",
      video: `${process.env.PUBLIC_URL || ''}/assets/videos/video 3.mp4`
    },
    {
      id: 4,
      title: "Light Meets Shadow",
      client: "",
      type: "",
      video: `${process.env.PUBLIC_URL || ''}/assets/videos/video 4.mp4`
    },
    {
      id: 5,
      title: "Grace In Silence",
      client: "",
      type: "",
      video: `${process.env.PUBLIC_URL || ''}/assets/videos/video 5.mp4`
    }
  ];

  useEffect(() => {
    // Update item counts
    const updateCounts = () => {
      const items = document.querySelectorAll('.feat-item');
      const itemCount = items.length;
      
      items.forEach((item, index) => {
        const caseNumber = item.querySelector('.case-number');
        const itemCountElement = item.querySelector('.item-count');
        
        if (caseNumber) {
          caseNumber.textContent = index + 1;
        }
        
        if (itemCountElement) {
          itemCountElement.textContent = itemCount;
        }
      });
    };
    
    updateCounts();
  }, []);

  return (
    <div id="features" className="feat-wrap w-dyn-list">
      <div role="list" className="feat-list w-dyn-items">
        {projects.map((project, index) => (
          <div 
            key={project.id}
            role="listitem" 
            className="feat-item w-dyn-item"
          >
            <a 
              href={`/projets/${project.title.toLowerCase().replace(/\s+/g, '-')}`} 
              className="feat-link w-inline-block"
            >
              <div className="feat-specs-div">
                <div className="feat-name-div">
                  <div className="project-name-txt">{project.title}</div>
                </div>
                {project.client && (
                  <div className="feat-side-content">
                    <div className="text-block">{project.client}</div>
                  </div>
                )}
                {project.type && (
                  <div className="feat-side-content">
                    <div className="text-block">{project.type}</div>
                  </div>
                )}
                <div className="of-div">
                  <div className="case-number">{index + 1}</div>
                  <div>/</div>
                  <div className="item-count">{projects.length}</div>
                </div>
              </div>
              <div data-video="playpause" className="feat-img-frame">
                <div className="video-embed w-embed">
                  <div className="video-cover">
                    <VideoSmart
                      src={project.video}
                      preload="auto"
                      muted={true}
                      loop={true}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProjects;