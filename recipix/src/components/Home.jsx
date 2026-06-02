import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, Leaf, Zap, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="relative pt-20 overflow-hidden bg-white-warm">
      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 pt-16 pb-24 md:pt-24 md:pb-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Text Box */}
        <div className="lg:col-span-7 space-y-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-sage-light/35 border border-sage-medium/20 rounded-full text-sage-dark text-xs font-semibold uppercase tracking-wider"
          >
            <ChefHatIcon className="w-3.5 h-3.5" />
            <span>Curated by Top Culinary Experts</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-serif font-black tracking-tight text-charcoal-dark leading-[1.05]"
          >
            Cook Smart. <br />
            <span className="text-sage-dark font-normal italic font-serif">Eat Better.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
            className="text-lg text-charcoal-medium max-w-lg leading-relaxed font-sans"
          >
            Discover hand-picked recipes crafted for taste, health, and joy. Learn cooking secrets that elevate your everyday meals.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              to="/recipes"
              className="group inline-flex items-center gap-2 px-6 py-3.5 bg-sage-dark hover:bg-sage-dark/95 text-white-pure font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            >
              <span>Explore Menu</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/reviews"
              className="inline-flex items-center gap-2 px-6 py-3.5 border border-charcoal-dark/15 hover:border-charcoal-dark hover:bg-charcoal-dark/5 text-charcoal-dark font-semibold rounded-full transition-all duration-300"
            >
              <span>Community Reviews</span>
            </Link>
          </motion.div>

          {/* Quick Info Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="grid grid-cols-3 gap-6 pt-6 border-t border-charcoal-dark/10"
          >
            <div className="flex flex-col gap-1">
              <span className="text-2xl font-bold font-serif text-charcoal-dark">150+</span>
              <span className="text-xs text-charcoal-light uppercase tracking-wider font-semibold">Gourmet Recipes</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-2xl font-bold font-serif text-charcoal-dark">100%</span>
              <span className="text-xs text-charcoal-light uppercase tracking-wider font-semibold">Fresh Ingredients</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-2xl font-bold font-serif text-charcoal-dark">30 Min</span>
              <span className="text-xs text-charcoal-light uppercase tracking-wider font-semibold">Avg. Prep Time</span>
            </div>
          </motion.div>
        </div>

        {/* Right Floating Image Card */}
        <div className="lg:col-span-5 relative flex justify-center z-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: -1 }}
            transition={{ type: "spring", stiffness: 180, damping: 15, delay: 0.2 }}
            className="relative w-full max-w-[400px] aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white-pure"
          >
            <img
              src="https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=1000&auto=format&fit=crop"
              alt="Plated dish"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Subtle Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/50 via-transparent to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 text-white-pure bg-white-pure/15 backdrop-blur-md border border-white-pure/25 p-4 rounded-2xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-sage-light">Chef's Special</p>
              <h4 className="font-serif text-lg font-bold">Pan-Seared Salmon Salad</h4>
            </div>
          </motion.div>

          {/* Abstract Sage Blobs / Decorator */}
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-sage-light/30 rounded-full filter blur-3xl z-[-1]" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-sage-medium/10 rounded-full filter blur-2xl z-[-1]" />
        </div>
      </section>

      {/* Bento-style Intro Banner */}
      <section className="bg-sage-light/25 border-y border-sage-medium/10 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white-pure p-8 rounded-3xl border border-sage-medium/10 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-sage-medium/15 flex items-center justify-center text-sage-dark">
              <Utensils className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-charcoal-dark">Easy Recipes</h3>
            <p className="text-sm text-charcoal-medium leading-relaxed">
              Simple steps, easily available ingredients, and crystal clear guides designed for cooks of all skill levels.
            </p>
          </div>

          <div className="bg-white-pure p-8 rounded-3xl border border-sage-medium/10 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-sage-medium/15 flex items-center justify-center text-sage-dark">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-charcoal-dark">Fresh Ingredients</h3>
            <p className="text-sm text-charcoal-medium leading-relaxed">
              We focus on clean, seasonal, whole foods that fuel your body and taste absolutely spectacular.
            </p>
          </div>

          <div className="bg-white-pure p-8 rounded-3xl border border-sage-medium/10 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-sage-medium/15 flex items-center justify-center text-sage-dark">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-charcoal-dark">Quick Cooking</h3>
            <p className="text-sm text-charcoal-medium leading-relaxed">
              Busy schedule? Discover healthy 15-minute breakfasts and fast weeknight dinners that don't compromise taste.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

// Extra inline component for chef hat icon
function ChefHatIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M6 18V6a4 4 0 0 1 8 0v12" />
      <path d="M18 18V9a4 4 0 0 0-8 0v9" />
      <path d="M3 18h18" />
      <path d="M12 2v2" />
      <path d="M12 18H6a3 3 0 0 0-3 3v1h18v-1a3 3 0 0 0-3-3h-6Z" />
    </svg>
  );
}

export default Home;
