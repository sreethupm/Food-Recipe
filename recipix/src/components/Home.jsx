import React, { useEffect, useRef, useState } from 'react';
import './Home.css';
import { FaUtensils, FaLeaf, FaFireAlt } from 'react-icons/fa';

function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [revealText, setRevealText] = useState(false);
  const floatRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      // Reveal mid text animation when scrolling
      if (window.scrollY > 200) setRevealText(true);
      else setRevealText(false);
    };
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cap floating image movement so it doesn't go too far
  const floatingTranslate = Math.min(scrollY * 0.2, 150);

  return (
    <>
      {/* HERO SECTION */}
      <section className="home-container" id="home">
        <div className="hero-glass">
          <h1 className="home-title">Cook Smart. Eat Better.</h1>
          <p className="home-subtitle">
            Discover hand-picked recipes crafted for taste, health & joy.
          </p>

          <div className="home-icons">
            <div className="icon-box float-delay-1">
              <FaUtensils />
              <span>Easy Recipes</span>
            </div>
            <div className="icon-box float-delay-2">
              <FaLeaf />
              <span>Fresh Ingredients</span>
            </div>
            <div className="icon-box float-delay-3">
              <FaFireAlt />
              <span>Quick Cooking</span>
            </div>
          </div>
        </div>

        {/* FLOATING IMAGE */}
        <img
          ref={floatRef}
          src="https://images.unsplash.com/photo-1495521821757-a1efb6729352"
          alt="Food"
          className="floating-home-img"
          style={{ transform: `translateY(${floatingTranslate}px)` }}
        />
      </section>

      {/* MID TEXT SECTION WITH ANIMATION */}
      <section className="mid-text-section">
        <h2
          className={`mid-text fade-in-up ${revealText ? 'reveal-section' : ''}`}
        >
          Recipes that Inspire. Moments that Delight.
        </h2>
      </section>

      {/* SCROLLING ANIMATED TEXT BETWEEN MID & SECOND SECTION */}
      <section className="scroll-text-section">
        <p
          className={`scroll-text fade-in-left ${revealText ? 'reveal-section' : ''}`}
        >
          Every bite tells a story. Every recipe is a memory.
        </p>
        <p
          className={`scroll-text fade-in-right ${revealText ? 'reveal-section' : ''}`}
        >
          From classic comfort food to gourmet creations — cook with love, share with joy.
        </p>
      </section>

      {/* SECOND SECTION */}
      <section className="sub-home-section">
        <h2 className={`fade-in-up ${revealText ? 'reveal-section' : ''}`}>
          Where Every Recipe Tells a Story
        </h2>
        <p className={`fade-in-up ${revealText ? 'reveal-section' : ''}`}>
          From comfort food to gourmet meals — Recipix helps you cook with
          confidence and creativity.
        </p>
      </section>
    </>
  );
}
export default Home;
