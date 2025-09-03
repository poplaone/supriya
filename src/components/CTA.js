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
                  <div className="h-xx-large">A little corner</div>
                </div>
                <div className="txt-row is-2">
                  <div className="h-xx-large">of stories and <span className="h-xx-large is-inria">stillness,</span></div>
                </div>
                <div className="txt-row is-4">
                  <div className="h-xx-large">made of me.</div>
                </div>
              </h2>
            </div>
            <div className="card-div is-button">
              {/* Paragraph replaced by headline per request; keeping structure for spacing */}
              <a href="/about-space" className="button w-inline-block is-animated" style={{ marginBottom: '0.75rem' }}>
                <div className="button-txt-wrap">
                  <img 
                    src="./assets/6755b0e0df4c47e427a30818_Asset 56.svg" 
                    loading="lazy" 
                    alt="" 
                    className="button-icon is-hover" 
                  />
                  <div className="button-txt">About Space</div>
                </div>
                <img 
                  src="./assets/678f8f9388d068ba378b7c49_Asset 81.svg" 
                  loading="lazy" 
                  alt="" 
                  className="button-icon is-default" 
                />
              </a>
              <a href="/photo" className="button w-inline-block is-animated">
                <div className="button-txt-wrap">
                  <img 
                    src="./assets/6755b0e0df4c47e427a30818_Asset 56.svg" 
                    loading="lazy" 
                    alt="" 
                    className="button-icon is-hover" 
                  />
                  <div className="button-txt">Photo Space</div>
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