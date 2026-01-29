import React, { useEffect, useState } from 'react';
import './Reviews.css';
import { getReviews, saveReviews } from '../utils/reviewsStorage';

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({
    name: '',
    rating: 5,
    comment: '',
  });

  // Load saved reviews
  useEffect(() => {
    setReviews(getReviews());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newReview = {
      ...form,
      date: new Date().toLocaleDateString(),
      id: Date.now(),
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    saveReviews(updated);

    setForm({ name: '', rating: 5, comment: '' });
  };

  return (
    <div className="reviews-page">
      <h1 className="reviews-title">Community Reviews</h1>

      {/* Add Review */}
      <form className="review-form" onSubmit={handleSubmit}>
        <input
          placeholder="Your Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <select
          value={form.rating}
          onChange={(e) =>
            setForm({ ...form, rating: Number(e.target.value) })
          }
        >
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>
              {n} Stars
            </option>
          ))}
        </select>

        <textarea
          placeholder="Write your experience..."
          value={form.comment}
          onChange={(e) =>
            setForm({ ...form, comment: e.target.value })
          }
          required
        />

        <button type="submit">Post Review</button>
      </form>

      {/* Reviews List */}
      <div className="reviews-list">
        {reviews.length === 0 && (
          <p className="no-reviews">No reviews yet. Be the first ✨</p>
        )}

        {reviews.map((r) => (
          <div className="review-card" key={r.id}>
            <div className="review-header">
              <strong>{r.name}</strong>
              <span>{'⭐'.repeat(r.rating)}</span>
            </div>
            <p className="review-date">{r.date}</p>
            <p className="review-text">{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reviews;
