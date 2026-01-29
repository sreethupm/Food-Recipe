import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

function Card({ name, image, time, description, recipeId }) {
  return (
    <div className="card">
      <div className="card-img-wrapper">
        <img src={image} alt={name} className="card-img" />
      </div>
      <div className="card-content">
        <h4 className="card-title">{name}</h4>
        <p className="card-time">⏱ {time}</p>
        <p className="card-desc">{description}</p>
        <Link to={`/recipes/${recipeId}`} className="card-btn">
          View Recipe →
        </Link>
      </div>
    </div>
  );
}

export default Card;
