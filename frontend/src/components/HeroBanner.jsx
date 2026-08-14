import React, { useState, useEffect, useCallback } from "react";
import "./HeroBanner.css";

const slides = [
  {
    id: 1,
    title: "Great Indian Festival | Live Now",
    subtitle: "Up to 70% Off on Top Electronics & Gadgets",
    img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&auto=format&fit=crop&q=85",
    tagline: "Mega Deals on 10,000+ Products",
  },
  {
    id: 2,
    title: "Electronics & Smart Devices Hub",
    subtitle: "Next-gen Laptops, 4K TVs & Smart Home Gadgets",
    img: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=1600&auto=format&fit=crop&q=85",
    tagline: "Starting ₹9,999 + Instant Bank Discounts",
  },
  {
    id: 3,
    title: "Audio, Headphones & Wearables",
    subtitle: "Premium ANC Headphones, Earbuds & Smartwatches",
    img: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=1600&auto=format&fit=crop&q=85",
    tagline: "Up to 75% Off Top Brands",
  },
  {
    id: 4,
    title: "Amazon Fashion Season Specials",
    subtitle: "Apparel, Footwear, Watches & Lifestyle Deals",
    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&auto=format&fit=crop&q=85",
    tagline: "50-80% Off on 500+ Top Brands",
  },
  {
    id: 5,
    title: "Home & Kitchen Essentials Store",
    subtitle: "Cookware, Smart Appliances & Storage Solutions",
    img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1600&auto=format&fit=crop&q=85",
    tagline: "Starting ₹199 | Free 1-Day Prime Delivery",
  },
];

const HeroBanner = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 5500);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  return (
    <div
      className="hero-banner"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="hero-banner__slides">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero-banner__slide ${index === current ? "hero-banner__slide--active" : ""}`}
          >
            <img
              src={slide.img}
              alt={slide.title}
              className="hero-banner__image"
              loading={index === 0 ? "eager" : "lazy"}
            />
            <div className="hero-banner__overlay-content">
              <span className="hero-banner__tagline">{slide.tagline}</span>
              <h2 className="hero-banner__title">{slide.title}</h2>
              <p className="hero-banner__subtitle">{slide.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Iconic Amazon gradient mask fading into #eaeded */}
      <div className="hero-banner__gradient-mask" />

      {/* Navigation Arrows */}
      <button
        className="hero-banner__arrow hero-banner__arrow--left"
        onClick={prevSlide}
        aria-label="Previous banner slide"
      >
        <span className="hero-banner__arrow-icon">‹</span>
      </button>
      <button
        className="hero-banner__arrow hero-banner__arrow--right"
        onClick={nextSlide}
        aria-label="Next banner slide"
      >
        <span className="hero-banner__arrow-icon">›</span>
      </button>

      {/* Indicators */}
      <div className="hero-banner__dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`hero-banner__dot ${i === current ? "hero-banner__dot--active" : ""}`}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;
