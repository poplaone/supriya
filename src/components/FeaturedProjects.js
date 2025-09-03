import React, { useEffect } from 'react';

const FeaturedProjects = () => {
  const projects = [
    {
      id: 1,
      title: "Wild Blueberry",
      client: "Grand Bleu",
      type: "Corporate Film",
      video: "./assets/videos/video 1.mov"
    },
    {
      id: 2,
      title: "Genomics",
      client: "Genome Quebec",
      type: "Corporate Film",
      video: "./assets/videos/video 2.mov"
    },
    {
      id: 3,
      title: "Best of Summer",
      client: "Club Piscine",
      type: "Advertisement",
      video: "./assets/videos/video 3.mov"
    },
    {
      id: 4,
      title: "Meeting",
      client: "Young Entrepreneurs Day",
      type: "Brand Content",
      video: "./assets/videos/video 4.mov"
    },
    {
      id: 5,
      title: "with Marianne Plaisance",
      client: "Onella",
      type: "Brand Content",
      video: "./assets/videos/video 5.mov"
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
                <div className="feat-side-content">
                  <div className="text-block">{project.client}</div>
                </div>
                <div className="feat-side-content">
                  <div className="text-block">{project.type}</div>
                </div>
                <div className="of-div">
                  <div className="case-number">{index + 1}</div>
                  <div>/</div>
                  <div className="item-count">{projects.length}</div>
                </div>
              </div>
              <div data-video="playpause" className="feat-img-frame">
                <div className="video-embed w-embed">
                  <div className="video-cover">
                    <video 
                      width="100%" 
                      muted 
                      autoPlay 
                      loop 
                      playsInline 
                      data-object-fit="cover" 
                      data-autoplay="true"
                    >
                      <source src={project.video} type="video/mp4" />
                      Your browser doesn't support HTML5 video tag.
                    </video>
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