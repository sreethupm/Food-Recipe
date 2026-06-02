import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Card({ name, image, time, description, recipeId, bentoClass }) {
  return (
    <Link 
      to={`/recipes/${recipeId}`} 
      className={`group relative block w-full h-full min-h-[300px] overflow-hidden rounded-[2rem] bg-charcoal-dark shadow-md hover:shadow-xl transition-all duration-500 ease-out border border-sage-medium/10 ${bentoClass}`}
    >
      {/* Recipe Card Image as Background */}
      <motion.img 
        layoutId={`recipe-image-${recipeId}`}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        src={image} 
        alt={name} 
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none"
      />

      {/* Subtle Black/Charcoal Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark via-charcoal-dark/40 to-charcoal-dark/5 group-hover:via-charcoal-dark/50 transition-all duration-300 pointer-events-none" />

      {/* Card Content (Bottom-aligned) */}
      <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end min-h-[50%] z-10 pointer-events-none">
        {/* Rating or badge if needed, e.g. Time */}
        <div className="inline-flex items-center gap-1.5 text-xs text-sage-light font-semibold uppercase tracking-wider mb-2">
          <ClockIcon className="w-3.5 h-3.5" />
          <span>{time}</span>
        </div>

        {/* Title */}
        <h4 className="font-serif text-xl sm:text-2xl font-bold text-white-pure tracking-tight mb-2 leading-tight group-hover:text-sage-light transition-colors duration-200">
          {name}
        </h4>

        {/* Description / Subtext */}
        <p className="text-xs text-white-pure/70 font-sans line-clamp-2 leading-relaxed">
          {description}
        </p>

        {/* Action (Fades in slightly on hover or indicator) */}
        <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-sage-medium group-hover:text-white-pure transition-colors duration-200">
          <span>View Recipe</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </Link>
  );
}

function ClockIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

export default Card;
