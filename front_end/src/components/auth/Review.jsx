import React, { useState } from 'react';
import './Review.css';

function App() {
  // State to manage reviews and form inputs
  const [reviews, setReviews] = useState([
    {  },
    
  ]);
  
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && reviewText) {
      const newReview = {
        id: reviews.length + 1,
        name,
        rating,
        reviewText,
      };
      setReviews([...reviews, newReview]);
      setName('');
      setRating(5);
      setReviewText('');
    }
  };

  return (
    <div className="review-container">
      <h1>Customer Reviews</h1>
      
      {/* Display Reviews */}
      <div className="reviews">
        {reviews.map((review) => (
          <div key={review.id} className="review">
            <h3>{review.name}</h3>
            <p className="rating">{"⭐".repeat(review.rating)}</p>
            <p className="review-text">{review.reviewText}</p>
          </div>
        ))}
      </div>

      {/* Add New Review */}
      <h2>Add Your Review</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Your Name:</label>
        <input
          type="text"
          id="name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        
        <label htmlFor="rating">Rating:</label>
        <select
          id="rating"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          <option value={5}>⭐⭐⭐⭐⭐</option>
          <option value={4}>⭐⭐⭐⭐</option>
          <option value={3}>⭐⭐⭐</option>
          <option value={2}>⭐⭐</option>
          <option value={1}>⭐</option>
        </select>

        <label htmlFor="review-text">Your Review:</label>
        <textarea
          id="review-text"
          placeholder="Write your review here"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />

        <button type="submit"className='btn'>Submit Review</button>
      </form>
    </div>
  );
}

export default App;
