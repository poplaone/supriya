import React, { useEffect } from 'react';

const FeaturedProjects = () => {
  const projects = [
    {
      id: 1,
      title: "Wild Blueberry",
      client: "Grand Bleu",
      type: "Corporate Film",
      image: "./assets/images/684333e1b1546aba5cd6539c_logo-positionnement-p-1080.jpg",
      video: "https://player.vimeo.com/progressive_redirect/playback/1068143072/rendition/1080p/file.mp4?loc=external&log_user=0&signature=a6396088cbc10d35e776dd7e08a30cd77560869268c51eae72279a7af89b9b80"
    },
    {
      id: 2,
      title: "Genomics",
      client: "Genome Quebec",
      type: "Corporate Film",
      image: "./assets/images/67c2074411fcc6322982c89c_Screenshot 2024-12-11 at 3.57.55 PM.jpg",
      video: "https://player.vimeo.com/progressive_redirect/playback/1068143296/rendition/1080p/file.mp4?loc=external&log_user=0&signature=45361f1c168c38505d5268bc534b24c38799b90f005a0dcf990cb1d69f610d7a"
    },
    {
      id: 3,
      title: "Best of Summer",
      client: "Club Piscine",
      type: "Advertisement",
      image: "./assets/images/67d06ea5444a4b0eff17b9b2_Screenshot 2025-03-11 at 12.54.41 PM.jpg",
      video: "https://player.vimeo.com/progressive_redirect/playback/1068155753/rendition/1080p/file.mp4?loc=external&log_user=0&signature=711cd2613f164f0d38b42a6d98b7140259a65198e0cbad9e6d2ad9adb907540f"
    },
    {
      id: 4,
      title: "Meeting",
      client: "Young Entrepreneurs Day",
      type: "Brand Content",
      image: "./assets/images/67c22305b25be17871923aef_Screenshot 2024-12-11 at 3.24.23 PM.jpg",
      video: "https://player.vimeo.com/progressive_redirect/playback/1068143135/rendition/1080p/file.mp4?loc=external&log_user=0&signature=abdc701b62153e9c8dbb6b85bb14d8923c40ce6ae5be190bc090f62abc6e6d9b"
    },
    {
      id: 5,
      title: "with Marianne Plaisance",
      client: "Onella",
      type: "Brand Content",
      image: "./assets/images/68308b73104abc7ed61d9579_Screenshot 2025-03-04 at 9.44.47 PM-p-1080.jpg",
      video: "https://player.vimeo.com/progressive_redirect/playback/1068143230/rendition/1080p/file.mp4?loc=external&log_user=0&signature=05a3e9f1ba18562ca8774f4450a255571a690b008a3cc8192c0d73308f1a1a6d"
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
    <div className="feat-wrap w-dyn-list">
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
                <img 
                  src={project.image} 
                  loading="lazy" 
                  alt={project.title} 
                  sizes="100vw" 
                  className="full-img" 
                />
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