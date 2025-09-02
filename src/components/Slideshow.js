import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
import './Slideshow.css';

// Register GSAP plugins
gsap.registerPlugin(Observer);

const Slideshow = () => {
  const slidesRef = useRef(null);
  const invertedSlidesRef = useRef(null);
  const slideshowInstance = useRef(null);
  const invertedSlideshowInstance = useRef(null);

  // Constants for direction
  const NEXT = 1;
  const PREV = -1;

  class SlideshowClass {
    constructor(DOM_el, autoplayDirection = -1) {
      this.DOM = {
        el: DOM_el,
        slides: [...DOM_el.querySelectorAll(".slide")],
        slidesInner: [...DOM_el.querySelectorAll(".slide")].map(slide => slide.querySelector(".slide__img"))
      };
      this.current = 0;
      this.slidesTotal = this.DOM.slides.length;
      this.isAnimating = false;
      this.autoplayDirection = autoplayDirection;
      this.DOM.slides[this.current].classList.add("slide--current");
      this.interval = setInterval(() => this.navigate(this.autoplayDirection), 4000);
    }

    navigate(direction) {
      if (this.isAnimating) return;
      this.isAnimating = true;
      clearInterval(this.interval);

      const previous = this.current;
      this.current = (this.current + direction + this.slidesTotal) % this.slidesTotal;

      const currentSlide = this.DOM.slides[previous];
      const upcomingSlide = this.DOM.slides[this.current];

      // GSAP timeline for animations
      gsap.timeline({
        defaults: {
          duration: 1.25,
          ease: "expo.inOut"
        },
        onStart: () => {
          gsap.set(upcomingSlide, {
            zIndex: 99
          });
          this.DOM.slides[this.current].classList.add("slide--current");
        },
        onComplete: () => {
          gsap.set(upcomingSlide, {
            zIndex: 1
          });
          this.DOM.slides[previous].classList.remove("slide--current");
          this.isAnimating = false;
          this.interval = setInterval(() => this.navigate(this.autoplayDirection), 4000);
        }
      })
      .fromTo(currentSlide, {
        yPercent: 0
      }, {
        yPercent: -100 * direction
      }, 0)
      .fromTo(upcomingSlide, {
        yPercent: 100 * direction
      }, {
        yPercent: 0
      }, 0);
    }

    next() {
      this.navigate(NEXT);
    }

    prev() {
      this.navigate(PREV);
    }

    destroy() {
      if (this.interval) {
        clearInterval(this.interval);
      }
    }
  }

  useEffect(() => {
    // Initialize slideshows
    if (slidesRef.current && invertedSlidesRef.current) {
      slideshowInstance.current = new SlideshowClass(slidesRef.current, 1);
      invertedSlideshowInstance.current = new SlideshowClass(invertedSlidesRef.current, -1);

      // Observer for handling wheel, touch, and pointer events
      Observer.create({
        type: "wheel,touch,pointer",
        onDown: () => {
          if (slideshowInstance.current && invertedSlideshowInstance.current) {
            slideshowInstance.current.prev();
            invertedSlideshowInstance.current.next();
          }
        },
        onUp: () => {
          if (slideshowInstance.current && invertedSlideshowInstance.current) {
            slideshowInstance.current.next();
            invertedSlideshowInstance.current.prev();
          }
        },
        wheelSpeed: 1,
        tolerance: 10
      });
    }

    // Cleanup
    return () => {
      if (slideshowInstance.current) {
        slideshowInstance.current.destroy();
      }
      if (invertedSlideshowInstance.current) {
        invertedSlideshowInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="w-layout-vflex slide_wrap">
      <div className="slides" ref={slidesRef}>
        <div className="slide w-dyn-list">
          <div role="list" className="w-dyn-items">
            <div role="listitem" className="cms-item w-dyn-item">
              <img 
                alt="" 
                loading="lazy" 
                style={{backgroundImage:"url('https://cdn.prod.website-files.com/651b3fcadac4158ce402b17d/681923ff75884b15d1167400_482134820_18487503592044648_3621568802037594652_n%20Large.jpeg')"}} 
                src="https://cdn.prod.website-files.com/651b3fcadac4158ce402b17d/681923ff75884b15d1167400_482134820_18487503592044648_3621568802037594652_n%20Large.jpeg"
                sizes="100vw" 
                srcSet="https://cdn.prod.website-files.com/651b3fcadac4158ce402b17d/681923ff75884b15d1167400_482134820_18487503592044648_3621568802037594652_n%20Large-p-500.jpeg 500w, https://cdn.prod.website-files.com/651b3fcadac4158ce402b17d/681923ff75884b15d1167400_482134820_18487503592044648_3621568802037594652_n%20Large-p-800.jpeg 800w, https://cdn.prod.website-files.com/651b3fcadac4158ce402b17d/681923ff75884b15d1167400_482134820_18487503592044648_3621568802037594652_n%20Large.jpeg 1024w"
                className="slide__img" 
              />
            </div>
          </div>
        </div>
        <div className="slide w-dyn-list">
          <div role="list" className="w-dyn-items">
            <div role="listitem" className="cms-item w-dyn-item">
              <img 
                alt="" 
                loading="lazy" 
                style={{backgroundImage:"url('https://cdn.prod.website-files.com/651b3fcadac4158ce402b17d/68192424fdbd126400a6bf16_02_250304_VOGUE_MAY25_TM_0124x5%20Large.jpeg')"}} 
                src="https://cdn.prod.website-files.com/651b3fcadac4158ce402b17d/68192424fdbd126400a6bf16_02_250304_VOGUE_MAY25_TM_0124x5%20Large.jpeg"
                sizes="100vw" 
                srcSet="https://cdn.prod.website-files.com/651b3fcadac4158ce402b17d/68192424fdbd126400a6bf16_02_250304_VOGUE_MAY25_TM_0124x5%20Large-p-500.jpeg 500w, https://cdn.prod.website-files.com/651b3fcadac4158ce402b17d/68192424fdbd126400a6bf16_02_250304_VOGUE_MAY25_TM_0124x5%20Large-p-800.jpeg 800w, https://cdn.prod.website-files.com/651b3fcadac4158ce402b17d/68192424fdbd126400a6bf16_02_250304_VOGUE_MAY25_TM_0124x5%20Large.jpeg 1024w"
                className="slide__img" 
              />
            </div>
          </div>
        </div>
        <div className="slide w-dyn-list">
          <div role="list" className="w-dyn-items">
            <div role="listitem" className="cms-item w-dyn-item">
              <img 
                alt="" 
                loading="lazy" 
                style={{backgroundImage:"url('https://cdn.prod.website-files.com/651b3fcadac4158ce402b17d/6819243b671f5c8c189ed080_484878967_18491083789044648_5544164220075111730_n%20Large.jpeg')"}} 
                src="https://cdn.prod.website-files.com/651b3fcadac4158ce402b17d/6819243b671f5c8c189ed080_484878967_18491083789044648_5544164220075111730_n%20Large.jpeg"
                sizes="100vw" 
                srcSet="https://cdn.prod.website-files.com/651b3fcadac4158ce402b17d/6819243b671f5c8c189ed080_484878967_18491083789044648_5544164220075111730_n%20Large-p-500.jpeg 500w, https://cdn.prod.website-files.com/651b3fcadac4158ce402b17d/6819243b671f5c8c189ed080_484878967_18491083789044648_5544164220075111730_n%20Large-p-800.jpeg 800w, https://cdn.prod.website-files.com/651b3fcadac4158ce402b17d/6819243b671f5c8c189ed080_484878967_18491083789044648_5544164220075111730_n%20Large.jpeg 1024w"
                className="slide__img" 
              />
            </div>
          </div>
        </div>
        <div className="slide w-dyn-list">
          <div role="list" className="w-dyn-items">
            <div role="listitem" className="cms-item w-dyn-item">
              <img 
                alt="" 
                loading="lazy" 
                style={{backgroundImage:"url('https://cdn.prod.website-files.com/651b3fcadac4158ce402b17d/681924524eb296d8d9b8c573_the-only-agency-1%20-%202025-05-05T133333.787%20Large.jpeg')"}} 
                src="https://cdn.prod.website-files.com/651b3fcadac4158ce402b17d/681924524eb296d8d9b8c573_the-only-agency-1%20-%202025-05-05T133333.787%20Large.jpeg"
                sizes="100vw" 
                srcSet="https://cdn.prod.website-files.com/651b3fcadac4158ce402b17d/681924524eb296d8d9b8c573_the-only-agency-1%20-%202025-05-05T133333.787%20Large-p-500.jpeg 500w, https://cdn.prod.website-files.com/651b3fcadac4158ce402b17d/681924524eb296d8d9b8c573_the-only-agency-1%20-%202025-05-05T133333.787%20Large-p-800.jpeg 800w, https://cdn.prod.website-files.com/651b3fcadac4158ce402b17d/681924524eb296d8d9b8c573_the-only-agency-1%20-%202025-05-05T133333.787%20Large.jpeg 1029w"
                className="slide__img" 
              />
            </div>
          </div>
        </div>
        <div className="slide w-dyn-list">
          <div role="list" className="w-dyn-items">
            <div role="listitem" className="cms-item w-dyn-item">
              <img 
                alt="" 
                loading="lazy" 
                style={{backgroundImage:"url('https://cdn.prod.website-files.com/651b3fcadac4158ce402b17d/68192469bec866bb231c4f37_483963982_18484745011024727_7217989718923500339_n%20Large.jpeg')"}} 
                src="https://cdn.prod.website-files.com/651b3fcadac4158ce402b17d/68192469bec866bb231c4f37_483963982_18484745011024727_7217989718923500339_n%20Large.jpeg"
                sizes="100vw" 
                srcSet="https://cdn.prod.website-files.com/651b3fcadac4158ce402b17d/68192469bec866bb231c4f37_483963982_18484745011024727_7217989718923500339_n%20Large-p-500.jpeg 500w, https://cdn.prod.website-files.com/651b3fcadac4158ce402b17d/68192469bec866bb231c4f37_483963982_18484745011024727_7217989718923500339_n%20Large-p-800.jpeg 800w, https://cdn.prod.website-files.com/651b3fcadac4158ce402b17d/68192469bec866bb231c4f37_483963982_18484745011024727_7217989718923500339_n%20Large.jpeg 1027w"
                className="slide__img" 
              />
            </div>
          </div>
        </div>
        <div className="slide w-dyn-list">
          <div role="list" className="w-dyn-items">
            <div role="listitem" className="cms-item w-dyn-item">
              <img 
                alt="" 
                loading="lazy" 
                style={{backgroundImage:"url('https://cdn.prod.website-files.com/651b3fcadac4158ce402b17d/68192555af704d820e90aeb7_491470439_18500139994044648_6929326004421339405_n%20Large.jpeg')"}} 
                src="https://cdn.prod.website-files.com/651b3fcadac4158ce402b17d/68192555af704d820e90aeb7_491470439_18500139994044648_6929326004421339405_n%20Large.jpeg"
                sizes="100vw" 
                srcSet="https://cdn.prod.website-files.com/651b3fcadac4158ce402b17d/68192555af704d820e90aeb7_491470439_18500139994044648_6929326004421339405_n%20Large-p-500.jpeg 500w, https://cdn.prod.website-files.com/651b3fcadac4158ce402b17d/68192555af704d820e90aeb7_491470439_18500139994044648_6929326004421339405_n%20Large-p-800.jpeg 800w, https://cdn.prod.website-files.com/651b3fcadac4158ce402b17d/68192555af704d820e90aeb7_491470439_18500139994044648_6929326004421339405_n%20Large.jpeg 987w"
                className="slide__img" 
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="inverted-slides" ref={invertedSlidesRef}>
        <div className="slide w-dyn-list">
          <div role="list" className="w-dyn-items">
            <div role="listitem" className="cms-item w-dyn-item">
              <img 
                alt="" 
                loading="lazy" 
                style={{backgroundImage:"url('https://cdn.prod.website-files.com/651b3fcadac4158ce402b17d/6819240eb3e7dee81b2ff11b_482361192_18487503556044648_1089544455227512365_n%20Large.jpeg')"}} 
                src="https://cdn.prod.website-files.com/651b3fcadac4158ce402b17d/6819240eb3e7dee81b2ff11b_482361192_18487503556044648_1089544455227512365_n%20Large.jpeg"
                sizes="100vw" 
                srcSet="https://cdn.prod.website-files.com/651b3fcadac4158ce402b17d/6819240eb3e7dee81b2ff11b_482361192_18487503556044648_1089544455227512365_n%20Large-p-500.jpeg 500w, https://cdn.prod.website-files.com/651b3fcadac4158ce402b17d/6819240eb3e7dee81b2ff11b_482361192_18487503556044648_1089544455227512365_n%20Large-p-800.jpeg 800w, https://cdn.prod.website-files.com/651b3fcadac4158ce402b17d/6819240eb3e7dee81b2ff11b_482361192_18487503556044648_1089544455227512365_n%20Large.jpeg 1024w"
                className="slide__img" 
              />
            </div>
          </div>
        </div>
        <div className="slide w-dyn-list">
          <div role="list" className="w-dyn-items">
            <div role="listitem" className="cms-item w-dyn-item">
              <img 
                alt="" 
                loading="lazy" 
                style={{backgroundImage:"url('https://cdn.prod.website-files.com/651b3fcadac4158ce402b17d/6819255f39081cd0224636e2_494562693_18500139973044648_3030630610366367027_n%20Large.jpeg')"}} 
                src="https://cdn.prod.website-files.com/651b3fcadac4158ce402b17d/6819255f39081cd0224636e2_494562693_18500139973044648_3030630610366367027_n%20Large.jpeg"
                sizes="100vw" 
                srcSet="https://cdn.prod.website-files.com/651b3fcadac4158ce402b17d/6819255f39081cd0224636e2_494562693_18500139973044648_3030630610366367027_n%20Large-p-500.jpeg 500w, https://cdn.prod.website-files.com/651b3fcadac4158ce402b17d/6819255f39081cd0224636e2_494562693_18500139973044648_3030630610366367027_n%20Large-p-800.jpeg 800w, https://cdn.prod.website-files.com/651b3fcadac4158ce402b17d/6819255f39081cd0224636e2_494562693_18500139973044648_3030630610366367027_n%20Large.jpeg 992w"
                className="slide__img" 
              />
            </div>
          </div>
        </div>
        <div className="slide w-dyn-list">
          <div role="list" className="w-dyn-items">
            <div role="listitem" className="cms-item w-dyn-item">
              <img 
                alt="" 
                loading="lazy" 
                style={{backgroundImage:"url('https://cdn.prod.website-files.com/651b3fcadac4158ce402b17d/681924723c8f4b328caba96c_483012234_18487347871014762_5856841982051660625_n%20Large.jpeg')"}} 
                src="https://cdn.prod.website-files.com/651b3fcadac4158ce402b17d/681924723c8f4b328caba96c_483012234_18487347871014762_5856841982051660625_n%20Large.jpeg"
                sizes="100vw" 
                srcSet="https://cdn.prod.website-files.com/651b3fcadac4158ce402b17d/681924723c8f4b328caba96c_483012234_18487347871014762_5856841982051660625_n%20Large-p-500.jpeg 500w, https://cdn.prod.website-files.com/651b3fcadac4158ce402b17d/681924723c8f4b328caba96c_483012234_18487347871014762_5856841982051660625_n%20Large-p-800.jpeg 800w, https://cdn.prod.website-files.com/651b3fcadac4158ce402b17d/681924723c8f4b328caba96c_483012234_18487347871014762_5856841982051660625_n%20Large.jpeg 1024w"
                className="slide__img" 
              />
            </div>
          </div>
        </div>
        <div className="slide w-dyn-list">
          <div role="list" className="w-dyn-items">
            <div role="listitem" className="cms-item w-dyn-item">
              <img 
                alt="" 
                loading="lazy" 
                style={{backgroundImage:"url('https://cdn.prod.website-files.com/651b3fcadac4158ce402b17d/6819245bb3e7dee81b30376a_489736071_18496212805044648_4658694978168017539_n%20Large.jpeg')"}} 
                src="https://cdn.prod.website-files.com/651b3fcadac4158ce402b17d/6819245bb3e7dee81b30376a_489736071_18496212805044648_4658694978168017539_n%20Large.jpeg"
                sizes="100vw" 
                srcSet="https://cdn.prod.website-files.com/651b3fcadac4158ce402b17d/6819245bb3e7dee81b30376a_489736071_18496212805044648_4658694978168017539_n%20Large-p-500.jpeg 500w, https://cdn.prod.website-files.com/651b3fcadac4158ce402b17d/6819245bb3e7dee81b30376a_489736071_18496212805044648_4658694978168017539_n%20Large-p-800.jpeg 800w, https://cdn.prod.website-files.com/651b3fcadac4158ce402b17d/6819245bb3e7dee81b30376a_489736071_18496212805044648_4658694978168017539_n%20Large.jpeg 1024w"
                className="slide__img" 
              />
            </div>
          </div>
        </div>
        <div className="slide w-dyn-list">
          <div role="list" className="w-dyn-items">
            <div role="listitem" className="cms-item w-dyn-item">
              <img 
                alt="" 
                loading="lazy" 
                style={{backgroundImage:"url('https://cdn.prod.website-files.com/651b3fcadac4158ce402b17d/6819244699f89828bb9ac6ea_484878597_18491083744044648_2417713184683683154_n%20Large.jpeg')"}} 
                src="https://cdn.prod.website-files.com/651b3fcadac4158ce402b17d/6819244699f89828bb9ac6ea_484878597_18491083744044648_2417713184683683154_n%20Large.jpeg"
                sizes="100vw" 
                srcSet="https://cdn.prod.website-files.com/651b3fcadac4158ce402b17d/6819244699f89828bb9ac6ea_484878597_18491083744044648_2417713184683683154_n%20Large-p-500.jpeg 500w, https://cdn.prod.website-files.com/651b3fcadac4158ce402b17d/6819244699f89828bb9ac6ea_484878597_18491083744044648_2417713184683683154_n%20Large-p-800.jpeg 800w, https://cdn.prod.website-files.com/651b3fcadac4158ce402b17d/6819244699f89828bb9ac6ea_484878597_18491083744044648_2417713184683683154_n%20Large.jpeg 1024w"
                className="slide__img" 
              />
            </div>
          </div>
        </div>
        <div className="slide w-dyn-list">
          <div role="list" className="w-dyn-items">
            <div role="listitem" className="cms-item w-dyn-item">
              <img 
                alt="" 
                loading="lazy" 
                style={{backgroundImage:"url('https://cdn.prod.website-files.com/651b3fcadac4158ce402b17d/68192430287919b4f66ef470_04_250304_VOGUE_MAY25_TM_032%20Large.jpeg')"}} 
                src="https://cdn.prod.website-files.com/651b3fcadac4158ce402b17d/68192430287919b4f66ef470_04_250304_VOGUE_MAY25_TM_032%20Large.jpeg"
                sizes="100vw" 
                srcSet="https://cdn.prod.website-files.com/651b3fcadac4158ce402b17d/68192430287919b4f66ef470_04_250304_VOGUE_MAY25_TM_032%20Large-p-500.jpeg 500w, https://cdn.prod.website-files.com/651b3fcadac4158ce402b17d/68192430287919b4f66ef470_04_250304_VOGUE_MAY25_TM_032%20Large-p-800.jpeg 800w, https://cdn.prod.website-files.com/651b3fcadac4158ce402b17d/68192430287919b4f66ef470_04_250304_VOGUE_MAY25_TM_032%20Large.jpeg 943w"
                className="slide__img" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slideshow;