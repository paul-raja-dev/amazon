import React, { useState, useEffect, useCallback } from "react";
import "./HeroBanner.css";

const slides = [
  {
    id: 1,
    title: "Starting ₹99 | All your home improvement needs",
    subtitle: "Top Deals on Kitchen, Tools & Appliances",
    img: "https://images-eu.ssl-images-amazon.com/images/G/31/OHL/24/GW/UNREC/PC_Hero_3000x1200_B0B._CB580005728_.jpg",
    fallbackBg: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
  },
  {
    id: 2,
    title: "Up to 75% off | Electronics & Laptops",
    subtitle: "Premium Laptops, Audio, Accessories & More",
    img: "https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/laptops/Desktop/PC_hero_1500x600._CB620831096_.jpg",
    fallbackBg: "linear-gradient(135deg, #1f4037, #99f2c8)",
  },
  {
    id: 3,
    title: "Mega Electronics & Smartphone Deals",
    subtitle: "Latest 5G Phones & Unbeatable Exchange Offers",
    img: "https://images-eu.ssl-images-amazon.com/images/G/31/img24/Wireless/Samsung/SamsungBAU/MSO_May/D129631248_WLD_MSO_May_Mob_Hero_1500x600._CB558509425_.jpg",
    fallbackBg: "linear-gradient(135deg, #2c3e50, #3498db)",
  },
  {
    id: 4,
    title: "Amazon Fashion | Up to 70% off",
    subtitle: "Top Brands in Apparel, Footwear & Accessories",
    img: "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Softlines_RightToLeft/GW_Desktop/Hero_3000x1200_2._CB575775438_.jpg",
    fallbackBg: "linear-gradient(135deg, #3a1c71, #d76d77, #ffaf7b)",
  },
  {
    id: 5,
    title: "Prime Video | Blockbuster Entertainment",
    subtitle: "Stream Thousands of Movies & Award-Winning Originals",
    img: "https://images-eu.ssl-images-amazon.com/images/G/31/Events/img24/Jupiter24/HERO/Teaser-3_1500X600._CB564883446_.jpg",
    fallbackBg: "linear-gradient(135deg, #141e30, #243b55)",
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
            style={{ background: slide.fallbackBg }}
          >
            <img
              src={slide.img}
              alt={slide.title}
              className="hero-banner__image"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
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
