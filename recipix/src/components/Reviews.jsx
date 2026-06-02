import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, UploadCloud, AlertCircle, ChefHat } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getReviews, saveReviews } from '../utils/reviewsStorage';

function Reviews({ user }) {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  
  // Photo upload states
  const [images, setImages] = useState([]); // array of base64 strings
  const [uploadError, setUploadError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Lightbox state
  const [activeLightboxImg, setActiveLightboxImg] = useState(null);

  // Load reviews
  useEffect(() => {
    setReviews(getReviews());
  }, []);

  // Handle Drag Over
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // Handle Drag Leave
  const handleDragLeave = () => {
    setIsDragging(false);
  };

  // Process Files
  const processFiles = (files) => {
    setUploadError('');
    let count = images.length;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Security Validation: File Type must be image
      if (!file.type.startsWith('image/')) {
        setUploadError('Only image files (JPEG, PNG, WEBP) are allowed.');
        continue;
      }

      // Security Validation: File Size limit (1MB max per image)
      if (file.size > 1024 * 1024) {
        setUploadError('Image size must be under 1MB to prevent performance issues.');
        continue;
      }

      // Check upload limit (max 3 images per review)
      if (count >= 3) {
        setUploadError('You can upload a maximum of 3 photos per review.');
        break;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(prev => {
          if (prev.length < 3) {
            return [...prev, reader.result];
          }
          return prev;
        });
      };
      reader.readAsDataURL(file);
      count++;
    }
  };

  // Handle Drop
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      processFiles(e.dataTransfer.files);
    }
  };

  // Handle File Input Change
  const handleFileChange = (e) => {
    if (e.target.files) {
      processFiles(e.target.files);
    }
  };

  // Remove uploaded image from draft list
  const removeDraftImage = (indexToRemove) => {
    setImages(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // Handle Submit Review
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Security check: simple validation
    if (!name.trim() || !comment.trim()) {
      return;
    }

    const newReview = {
      id: Date.now(),
      name: name.trim(),
      rating,
      comment: comment.trim(),
      images,
      date: new Date().toLocaleDateString(undefined, { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }),
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    saveReviews(updated);

    // Reset Form
    setName('');
    setRating(5);
    setComment('');
    setImages([]);
    setUploadError('');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 space-y-16">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto space-y-4">
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-charcoal-dark">Community Reviews</h1>
        <p className="text-charcoal-medium text-sm">
          Hear from home chefs who tried our recipes. Share your own kitchen creations with the community!
        </p>
      </div>

      {/* Form & Upload Area */}
      {user ? (
        <div className="max-w-2xl mx-auto bg-white-pure rounded-3xl p-8 border border-sage-medium/10 shadow-lg space-y-6">
          <h3 className="font-serif text-xl font-bold text-charcoal-dark border-b border-sage-light/20 pb-4">
            Write a Review
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-medium">Your Name</label>
                <input
                  type="text"
                  placeholder="e.g. Sarah K."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white-warm border border-sage-medium/20 rounded-xl focus:outline-none focus:ring-1 focus:ring-sage-dark focus:border-sage-dark text-sm text-charcoal-dark"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-medium">Rating</label>
                <div className="relative">
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-white-warm border border-sage-medium/20 rounded-xl focus:outline-none focus:ring-1 focus:ring-sage-dark focus:border-sage-dark text-sm text-charcoal-dark appearance-none cursor-pointer"
                  >
                    <option value={5}>5 Stars ★★★★★</option>
                    <option value={4}>4 Stars ★★★★☆</option>
                    <option value={3}>3 Stars ★★★☆☆</option>
                    <option value={2}>2 Stars ★★☆☆☆</option>
                    <option value={1}>1 Star ★☆☆☆☆</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-charcoal-light text-xs">▼</div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-medium">Your Experience</label>
              <textarea
                placeholder="Tell us how it turned out! Did you make any substitutions?"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                rows={4}
                className="w-full px-4 py-3 bg-white-warm border border-sage-medium/20 rounded-xl focus:outline-none focus:ring-1 focus:ring-sage-dark focus:border-sage-dark text-sm text-charcoal-dark resize-none"
              />
            </div>

            {/* SOPHISTICATED DRAG & DROP ZONE */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-medium">Add Food Photos</label>
              
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`w-full py-8 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
                  isDragging 
                    ? 'border-sage-dark bg-sage-light/20' 
                    : 'border-sage-medium/30 bg-white-warm/50 hover:bg-white-warm hover:border-sage-medium/60'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <UploadCloud className="w-8 h-8 text-sage-dark/80 mb-2" />
                <p className="text-sm font-semibold text-charcoal-dark">Drag and drop your photos here</p>
                <p className="text-xs text-charcoal-light mt-1">or click to browse from your device</p>
                <p className="text-[10px] text-charcoal-light/75 mt-2">JPEG, PNG, WEBP (Max 1MB per file, limit 3)</p>
              </div>

              {/* Error Indicator */}
              <AnimatePresence>
                {uploadError && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="flex items-center gap-2 text-xs font-medium text-red-600 bg-red-50 border border-red-100 p-2.5 rounded-lg mt-2"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{uploadError}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Draft Photos Preview Thumbnails */}
              {images.length > 0 && (
                <div className="flex gap-4 mt-4 flex-wrap">
                  {images.map((imgSrc, idx) => (
                    <div key={idx} className="relative w-20 h-20 rounded-xl overflow-hidden shadow border border-sage-medium/20">
                      <img src={imgSrc} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeDraftImage(idx);
                        }}
                        className="absolute top-1 right-1 p-1 bg-charcoal-dark/70 text-white-pure rounded-full hover:bg-charcoal-dark transition"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-sage-dark hover:bg-sage-dark/90 text-white-pure font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              Post Review
            </button>
          </form>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto bg-white-pure/80 backdrop-blur-md rounded-3xl p-8 border border-sage-medium/15 shadow-lg text-center space-y-6">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-sage-medium/10 flex items-center justify-center border border-sage-medium/20 text-sage-dark">
            <ChefHat className="w-8 h-8" />
          </div>
          <div className="space-y-2 max-w-md mx-auto">
            <h3 className="font-serif text-2xl font-bold text-charcoal-dark">Share Your Culinary Experience</h3>
            <p className="text-sm text-charcoal-medium leading-relaxed font-sans">
              Join our community of home chefs! Sign in to write reviews, recommend substitutions, and upload photos of your creations.
            </p>
          </div>
          <div className="pt-2">
            <Link
              to="/login"
              className="inline-block px-8 py-3.5 bg-sage-dark hover:bg-sage-dark/95 text-white-pure font-semibold text-sm rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            >
              Sign In to Post Review
            </Link>
          </div>
        </div>
      )}

      {/* REVIEWS MASONRY GRID */}
      <div className="space-y-8">
        <h3 className="font-serif text-2xl font-bold text-charcoal-dark text-center border-b border-sage-light/20 pb-4 max-w-sm mx-auto">
          Community Creations
        </h3>

        {reviews.length === 0 ? (
          <div className="text-center py-16 bg-white-pure border border-sage-medium/10 rounded-[2rem] max-w-lg mx-auto">
            <span className="text-3xl">✨</span>
            <h4 className="font-serif text-lg font-bold text-charcoal-dark mt-2">No Reviews Yet</h4>
            <p className="text-xs text-charcoal-light mt-1">Be the first to share your experience with the community!</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 [column-fill:_balance]">
            {reviews.map((r) => (
              <div
                key={r.id}
                className="break-inside-avoid bg-white-pure rounded-3xl p-6 border border-sage-medium/10 shadow-sm flex flex-col space-y-4 hover:shadow-md transition-shadow duration-300"
              >
                {/* User & Date Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-serif font-bold text-charcoal-dark text-base">{r.name}</h4>
                    <span className="text-[10px] text-charcoal-light">{r.date}</span>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex gap-0.5 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${i < r.rating ? 'fill-current' : 'text-charcoal-light/25'}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Comment Text */}
                <p className="text-sm text-charcoal-medium leading-relaxed font-sans">{r.comment}</p>

                {/* Review Food Photos with Lightbox Trigger */}
                {r.images && r.images.length > 0 && (
                  <div className="flex flex-wrap gap-2.5 pt-2">
                    {r.images.map((imgSrc, idx) => (
                      <div
                        key={idx}
                        onClick={() => setActiveLightboxImg(imgSrc)}
                        className="relative w-[75px] h-[75px] rounded-xl overflow-hidden cursor-zoom-in border border-sage-medium/15 hover:opacity-90 active:scale-95 transition-all shadow-sm shrink-0"
                      >
                        <img src={imgSrc} alt="User creation" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* IMAGE LIGHTBOX OVERLAY */}
      <AnimatePresence>
        {activeLightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveLightboxImg(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-dark/90 backdrop-blur-sm cursor-zoom-out"
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveLightboxImg(null)}
              className="absolute top-6 right-6 p-2 bg-white-pure/15 text-white-pure hover:bg-white-pure/25 rounded-full border border-white-pure/10 shadow-lg cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Large Image */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="relative max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl bg-black border border-white-pure/10"
              onClick={(e) => e.stopPropagation() /* Prevent close when clicking image */}
            >
              <img
                src={activeLightboxImg}
                alt="Enlarged food"
                className="max-w-full max-h-[85vh] object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Reviews;
