import React, { useEffect, useRef, useState } from 'react';
import './AnimatedText.css';

function AnimatedText({ text }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => ref.current && observer.unobserve(ref.current);
  }, []);

  return (
    <div
      className={`animated-text-container ${isVisible ? 'visible' : ''}`}
      ref={ref}
    >
      {text.split('').map((char, index) => (
        <span
          key={index}
          style={{ transitionDelay: `${index * 0.05}s` }}
          className="animated-char"
        >
          {char}
        </span>
      ))}
    </div>
  );
}

export default AnimatedText;
