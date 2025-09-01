import React, { useEffect } from 'react';

const Footer = () => {
  useEffect(() => {
    // Set current year
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('[data-current-year]');
    yearElements.forEach(element => {
      element.textContent = currentYear;
    });
  }, []);

  return (
    <section className="section is-footer">
      <div className="section-padding is-footer">
        <div className="container is-footer">
          <div className="footer-column is-1st">
            <div className="footer-nav-wrap">
              <div className="language-div is-footer">
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
              
              <a href="/a-propos" className="navlink is-footer w-inline-block">
                <div className="navlink-arrow">
                  <svg width="100%" height="100%" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_3947_3319)">
                      <path d="M10.3666 1.13166L19.9333 10.6984H0V12.3016H19.9333L10.3666 21.8648L11.5017 23L23 11.4983L11.5017 0L10.3666 1.13166Z" fill="currentColor"/>
                    </g>
                  </svg>
                </div>
                <div className="navlink-txt">À propos</div>
              </a>
              
              <a href="/projets" className="navlink is-footer w-inline-block">
                <div className="navlink-arrow">
                  <svg width="100%" height="100%" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_3947_3319)">
                      <path d="M10.3666 1.13166L19.9333 10.6984H0V12.3016H19.9333L10.3666 21.8648L11.5017 23L23 11.4983L11.5017 0L10.3666 1.13166Z" fill="currentColor"/>
                    </g>
                  </svg>
                </div>
                <div className="navlink-txt">Projets</div>
              </a>
              
              <a href="/blogue" className="navlink is-footer w-inline-block">
                <div className="navlink-arrow">
                  <svg width="100%" height="100%" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_3947_3319)">
                      <path d="M10.3666 1.13166L19.9333 10.6984H0V12.3016H19.9333L10.3666 21.8648L11.5017 23L23 11.4983L11.5017 0L10.3666 1.13166Z" fill="currentColor"/>
                    </g>
                  </svg>
                </div>
                <div className="navlink-txt">Blogue</div>
              </a>
              
              <a href="/contact" className="navlink is-footer w-inline-block">
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
            
            <div className="footer-bottom-div">
              <div className="b-div">
                <div className="b-corp-div"></div>
              </div>
              <div className="social-wrap is-footer">
                <a href="https://www.linkedin.com/company/tungstenstudio" target="_blank" rel="noopener noreferrer" className="txt-link w-inline-block">
                  <div>LinkedIn</div>
                </a>
                <a href="https://www.instagram.com/tungsten.studio/" target="_blank" rel="noopener noreferrer" className="txt-link w-inline-block">
                  <div>Instagram</div>
                </a>
              </div>
            </div>
          </div>
          
          <div className="footer-column is-2nd">
            <div className="footer-star-div">
              <div className="footer-icon-div">
                <img 
                  src="./assets/6755b0e02eca5a31b7eba5ee_Asset 48.svg" 
                  loading="lazy" 
                  alt="" 
                  className="footer-icon" 
                />
              </div>
              <div className="nav-contact-div is-footer">
                <a href="tel:514-903-4455" className="txt-link w-inline-block">
                  <div>514-903-4455</div>
                </a>
                <a href="mailto:info@tungstenstudio.ca?subject=Hey%20Tungsten!" className="txt-link w-inline-block">
                  <div>info@tungstenstudio.ca</div>
                </a>
              </div>
            </div>
            <div className="footer-logo-div">
              <a href="/" aria-current="page" className="footer-brand w-inline-block w--current">
                <img 
                  src="./assets/6755cfdf41ac17b05aa0ffb0_n1.svg" 
                  alt="Tungsten Logo" 
                  className="n-icon is-1"
                />
                <img 
                  src="./assets/6755cfdf67ea049526b107ee_n2.svg" 
                  alt="" 
                  className="n-icon is-2"
                />
                <img 
                  src="./assets/6755cfdfa87b494f2b79ee4a_n3.svg" 
                  alt="" 
                  className="n-icon is-3"
                />
                <img 
                  src="./assets/6755cfdf6b2f0e11a119302a_n4.svg" 
                  alt="" 
                  className="n-icon is-4"
                />
                <img 
                  src="./assets/6755cfdfdbde22bab5e02b17_n5.svg" 
                  alt="" 
                  className="n-icon is-5"
                />
                <img 
                  src="./assets/6755cfdf5c8ebfe1570cb49d_n6.svg" 
                  alt="" 
                  className="n-icon is-6"
                />
              </a>
            </div>
          </div>
        </div>
        
        <div className="copyright-div">
          <div className="copyright-content">
            <div>© <span data-current-year="">2011</span> Tungsten - Tous droits réservés</div>
            <div><a href="/politique-de-confidentialite" className="credit-link">Politique de confidentialité</a></div>
            <div><a href="/politique-de-cookies" className="credit-link">Politique de cookies</a></div>
          </div>
          <div>Site web par <a href="https://www.jomor.design/" target="_blank" rel="noopener noreferrer" className="credit-link">Jomor Design</a></div>
        </div>
      </div>
    </section>
  );
};

export default Footer;