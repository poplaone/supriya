import React from 'react';
import './AboutSpace.css';

const AboutSpace = () => {
  const baseUrl = process.env.PUBLIC_URL || '';

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="section is-hero about-hero">
        <div className="section-padding is-hero">
          <div className="container is-max-110">
            <div className="about-hero-inner">
              <div className="about-hero-copy">
                <h1 className="h-xx-large">
                  About <span className="inria-highlight">Space</span>
                </h1>
                <p className="txt-x-large about-tagline">
                  Music is a place. A presence. A quiet infinity we learn to belong to.
                </p>
              </div>
              <div className="about-hero-media">
                <div className="about-hero-mask about-hero-mask--left">
                  <img
                    src={`${baseUrl}/assets/images/about page 1.jpg`}
                    alt="About Space 1"
                    className="about-hero-img"
                    loading="eager"
                  />
                </div>
                <div className="about-hero-mask about-hero-mask--right">
                  <img
                    src={`${baseUrl}/assets/images/about page 2.webp`}
                    alt="About Space 2"
                    className="about-hero-img"
                    loading="lazy"
                  />
                </div>
                <div className="about-hero-icon">
                  <img
                    src={`${baseUrl}/assets/67464b37c005049376e9c992_Asset 29.svg`}
                    alt=""
                    className="about-icon rotating"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Body Section */}
      <section className="section about-body">
        <div className="section-padding">
          <div className="container is-max-110">
            <div className="about-grid">
              <div className="about-col">
                <p className="txt-large">
                  Music has always felt less like a subject to study, and more like a living presence I’m slowly
                  learning to understand.
                </p>
                <p className="txt-large">
                  Each note carries a story, each raga a universe, and every silence between them a truth deeper
                  than words.
                </p>
                <p className="txt-large">
                  When I sit to practice, I feel as though I’m standing at the edge of an ocean. The notes ripple
                  like waves—sometimes calm, sometimes wild—but always pulling me closer to their depths. In those
                  moments, music is no longer something outside of me. It breathes, it waits, it reveals itself little
                  by little.
                </p>
              </div>
              <div className="about-col">
                <div className="about-quote">
                  <div className="quote-mark">“</div>
                  <div className="quote-text">
                    I don’t dream of mastering music. I dream of dissolving into it. To let melodies flow through me
                    as naturally as breath, and to offer my voice as a small echo in a tradition far greater than
                    myself.
                  </div>
                  <div className="quote-mark end">”</div>
                </div>
                <p className="txt-large">
                  I’ve come to realize that discipline is not a burden—it’s a devotion. Repetition is not dull—it’s a
                  prayer. With every scale, I’m not just learning sound, I’m unlearning noise. The journey is endless,
                  and perhaps that’s what makes it beautiful.
                </p>
                <p className="txt-large">
                  In the end, I’m not here to conquer the stage or chase applause. I’m here to listen, to surrender,
                  and to keep walking the path that music unfolds before me.
                </p>
                <div className="about-closer">
                  <div className="txt-x-large">
                    Because for me, music is not just what I do—
                  </div>
                  <div className="h-large is-inria about-closer-accent">it is where I belong.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Illustration Echo */}
      <section className="section about-echo">
        <div className="section-padding">
          <div className="container">
            <div className="about-echo-card">
              <div className="about-echo-copy">
                <div className="h-xx-large">
                  Listen. <span className="inria-highlight">Surrender.</span> Belong.
                </div>
                <p className="txt-large">A space to return to, every time.</p>
              </div>
              <img
                src={`${baseUrl}/assets/678ebc30aacce5575ba2d254_cta-bg-illustration.svg`}
                alt=""
                className="about-echo-bg"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutSpace;
