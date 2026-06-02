import React from 'react';
import { BookOpen, Calendar, ShieldCheck, Users, Heart, Utensils } from 'lucide-react';
import { motion } from 'framer-motion';

function Services() {
  const services = [
    {
      title: 'Personalized Recipes',
      description: 'Get recipes tailored to your taste, dietary preferences, and skill level.',
      icon: <Utensils className="w-6 h-6 text-sage-dark" />
    },
    {
      title: 'Step-by-Step Cooking Guides',
      description: 'Easy-to-follow instructions with tips for perfect results every time.',
      icon: <BookOpen className="w-6 h-6 text-sage-dark" />
    },
    {
      title: 'Meal Planning',
      description: 'Plan your meals weekly with our smart suggestions and grocery lists.',
      icon: <Calendar className="w-6 h-6 text-sage-dark" />
    },
    {
      title: 'Nutrition Tracking',
      description: 'Track calories, macronutrients, and stay healthy while enjoying food.',
      icon: <Heart className="w-6 h-6 text-sage-dark" />
    },
    {
      title: 'Community Sharing',
      description: 'Share your creations, post photos, write reviews and get inspired by other cooks.',
      icon: <Users className="w-6 h-6 text-sage-dark" />
    },
    {
      title: 'Verified Safety Scans',
      description: 'All recipe ingredients and guides are verified to comply with standard kitchen safety procedures.',
      icon: <ShieldCheck className="w-6 h-6 text-sage-dark" />
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 220, damping: 20 } 
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 space-y-16">
      {/* Page Title */}
      <div className="text-center max-w-xl mx-auto space-y-4">
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-charcoal-dark">Our Services</h1>
        <p className="text-charcoal-medium text-sm">
          We go beyond listing ingredients. Discover the complete Recipix experience, designed to help you cook, share, and eat with joy.
        </p>
      </div>

      {/* Services Bento-Style Cards Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-white-pure rounded-3xl p-8 border border-sage-medium/10 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-start space-y-4 group hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-2xl bg-sage-medium/10 flex items-center justify-center border border-sage-medium/20 group-hover:bg-sage-medium/20 transition-colors duration-300">
              {service.icon}
            </div>
            <h3 className="font-serif text-lg font-bold text-charcoal-dark tracking-tight">
              {service.title}
            </h3>
            <p className="text-sm text-charcoal-medium leading-relaxed font-sans">
              {service.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default Services;
