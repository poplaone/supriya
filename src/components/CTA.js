import React from 'react';

const CTA = () => {
  return (
    <div id="footer" className="section is-cta">
      <div className="section-padding is-sticky">
        <div className="cta-card">
          <div className="container is-max-110">
            <div className="card-div">
              <h2 className="cta-h">
                <div className="txt-row is-1">
                  <div className="h-xx-large">
                    Les <span className="h-xx-large is-inria">histoires</span>
                  </div>
                </div>
                <div className="txt-row is-2">
                  <div className="h-xx-large">sont partout</div>
                </div>
                <div className="txt-row is-4">
                  <div className="h-xx-large">
                    autour de nous<span className="inria-highlight"> </span>
                  </div>
                </div>
              </h2>
            </div>
            <div className="card-div is-button">
              <div className="cta-p-div">
                <p className="txt-x-large">On veut vous aider à raconter la vôtre</p>
              </div>
              <a href="/contact" className="button w-inline-block">
                <div className="button-txt-wrap">
                  <img 
                    src="./assets/6755b0e0df4c47e427a30818_Asset 56.svg" 
                    loading="lazy" 
                    alt="" 
                    className="button-icon is-hover" 
                  />
                  <div className="button-txt">Contactez-nous</div>
                </div>
                <img 
                  src="./assets/678f8f9388d068ba378b7c49_Asset 81.svg" 
                  loading="lazy" 
                  alt="" 
                  className="button-icon is-default" 
                />
              </a>
            </div>
          </div>
          <img 
            src="./assets/678ebc30aacce5575ba2d254_cta-bg-illustration.svg" 
            loading="lazy" 
            alt="" 
            className="cta-bg-shape" 
          />
        </div>
      </div>
    </div>
  );
};

export default CTA;