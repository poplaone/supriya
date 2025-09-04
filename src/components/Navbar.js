import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.navbar') && !event.target.closest('.menu-button')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar-div">
      <div className="brand-wrap">
        <a href="/" className="brand is-main">
          <img 
            src="./assets/Generated_Image_September_03__2025_-_1_51PM__1_-removebg-preview (1).png" 
            loading="lazy" 
            alt="Space Logo" 
            className="brand-img is-1"
          />
          {/* Small 3-line audio visualizer overlayed in front of the logo (mobile focused) */}
          <div className="logo-visualizer" aria-hidden="true">
            <span className="bar bar-1" />
            <span className="bar bar-2" />
            <span className="bar bar-3" />
          </div>
        </a>
      </div>
      
      <div className={`navbar ${isMenuOpen ? 'w--open' : ''}`}>
        <div className="container nav">
          <nav role="navigation" className="nav-menu">
            <div className="nav-scroll-wrap">
              <div className="nav-row">
                <div className="nav-contact-div">
                  <a href="tel:514-903-4455" className="txt-link">
                    <div>514-903-4455</div>
                  </a>
                  <a href="mailto:info@yourdomain.com?subject=Hey%20Space!" className="txt-link">
                    <div>info@yourdomain.com</div>
                  </a>
                </div>
                <div className="nav-wrap">
                  <a href="/a-propos" className="navlink">
                    <div className="navlink-arrow">
                      <svg width="100%" height="100%" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_3947_3319)">
                          <path d="M10.3666 1.13166L19.9333 10.6984H0V12.3016H19.9333L10.3666 21.8648L11.5017 23L23 11.4983L11.5017 0L10.3666 1.13166Z" fill="currentColor"/>
                        </g>
                      </svg>
                    </div>
                    <div className="navlink-txt">About Space</div>
                  </a>
                  <a href="/projets" className="navlink">
                    <div className="navlink-arrow">
                      <svg width="100%" height="100%" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_3947_3319)">
                          <path d="M10.3666 1.13166L19.9333 10.6984H0V12.3016H19.9333L10.3666 21.8648L11.5017 23L23 11.4983L11.5017 0L10.3666 1.13166Z" fill="currentColor"/>
                        </g>
                      </svg>
                    </div>
                    <div className="navlink-txt">Works</div>
                  </a>
                  <a href="/blogue" className="navlink">
                    <div className="navlink-arrow">
                      <svg width="100%" height="100%" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_3947_3319)">
                          <path d="M10.3666 1.13166L19.9333 10.6984H0V12.3016H19.9333L10.3666 21.8648L11.5017 23L23 11.4983L11.5017 0L10.3666 1.13166Z" fill="currentColor"/>
                        </g>
                      </svg>
                    </div>
                    <div className="navlink-txt">Journal</div>
                  </a>
                  <a href="/contact" className="navlink">
                    <div className="navlink-arrow">
                      <svg width="100%" height="100%" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_3947_3319)">
                          <path d="M10.3666 1.13166L19.9333 10.6984H0V12.3016H19.9333L10.3666 21.8648L11.5017 23L23 11.4983L11.5017 0L10.3666 1.13166Z" fill="currentColor"/>
                        </g>
                      </svg>
                    </div>
                    <div className="navlink-txt">Contact</div>
                  </a>
                </div>
              </div>
              <div className="nav-row is-2nd">
                <div className="social-wrap">
                </div>
                <div className="language-div">
                  <div className="locales-wrap w-locales-list">
                    <div role="list" className="locale-list w-locales-items">
                      <div role="listitem" className="locale w-locales-item">
                        <a hrefLang="fr-CA" href="/" aria-current="page" className="locale-link w--current">FR</a>
                      </div>
                      <div role="listitem" className="locale w-locales-item">
                        <a hrefLang="en-CA" href="/en" className="locale-link">EN</a>
                      </div>
                      <div role="listitem" className="locale w-locales-item">
                        <a hrefLang="de" href="/de" className="locale-link">DE</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
          
          <div className="menu-button" onClick={toggleMenu}>
            <div className="menu-icon-wrap">
              <div className={`menu-line _1 ${isMenuOpen ? 'is-x-1' : ''}`}></div>
              <div className={`menu-line _2 ${isMenuOpen ? 'is-x-2' : ''}`}></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="nav-side"></div>
      <div className="nav-side is-right"></div>
    </div>
  );
};

export default Navbar;