import React, { useEffect } from 'react';
import FooterVideo from './FooterVideo';

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
          {/* Footer video background */}
          <FooterVideo />
          {/* Empty footer content - will be built further later */}
        </div>
      </div>
    </section>
  );
};

export default Footer;