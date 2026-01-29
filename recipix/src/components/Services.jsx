import React from 'react';
import './Services.css';

function Services() {
  const services = [
    {
      title: 'Personalized Recipes',
      description: 'Get recipes tailored to your taste, dietary preferences, and skill level.',
      icon: '🍳'
    },
    {
      title: 'Step-by-Step Cooking Guides',
      description: 'Easy-to-follow instructions with tips for perfect results every time.',
      icon: '📖'
    },
    {
      title: 'Meal Planning',
      description: 'Plan your meals weekly with our smart suggestions and grocery lists.',
      icon: '🗓️'
    },
    {
      title: 'Nutrition Tracking',
      description: 'Track calories, macronutrients, and stay healthy while enjoying food.',
      icon: '🥗'
    },
    {
      title: 'Community Sharing',
      description: 'Share your creations and get inspired by other cooks.',
      icon: '👨‍🍳'
    },
    {
      title: 'Video Tutorials',
      description: 'Watch professional chefs demonstrate techniques in HD videos.',
      icon: '🎥'
    },
  ];

  return (
    <div className="services-container">
      <h2 className="services-title">Our Services</h2>

      <div className="services-grid">
        {services.map((service, index) => (
          <div
            className="service-card"
            key={index}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="service-icon">{service.icon}</div>
            <h3 className="service-name">{service.title}</h3>
            <p className="service-desc">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
