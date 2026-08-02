// StoriesCarousel — static hero customer photo. Carousel behavior removed: a single
// image is shown, with no autoplay, no pause control, and no slide/transition animation.
// Markup keeps the .fc / .fc-img classes so hero sizing and spacing stay unchanged.
const StoriesCarousel = () => (
  <div className="fc" aria-label="Dalgo customer in the field">
    <div className="fc-stage">
      <div className="fc-slide">
        <img className="fc-img" src="assets/consult-1.webp" alt="STiR Education — Dalgo customer" loading="eager" decoding="async" />
      </div>
    </div>
  </div>
);
window.StoriesCarousel = StoriesCarousel;
