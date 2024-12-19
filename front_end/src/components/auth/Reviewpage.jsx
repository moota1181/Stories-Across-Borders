import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography, Box, Grid, CircularProgress, TextField, Button, Paper, Alert } from '@mui/material';
import { Rating } from '@mui/material';  // Use Rating from @mui/material

const ReviewPage = () => {
  const { itemId } = useParams();  // الحصول على itemId من الـ URL
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [error, setError] = useState('');

  // فرضًا itemType هنا هو "story"، يمكن تغييره حسب الحاجة
  const itemType = "story"; 

  // جلب المراجعات عند تحميل الصفحة
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/getReviews/${itemId}`);
        setReviews(response.data.reviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [itemId]);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleRatingChange = (event, newRating) => {
    setRating(newRating);
  };

  const handleSubmitComment = async () => {
    if (!comment || rating <= 0) {
      setError('Please enter a comment and a rating');
      return;
    }

    try {
      const newReview = {
        itemId,        // إرسال itemId
        itemType,      // إرسال itemType (مثل "story")
        comment,
        rating,
      };

      const response = await axios.post('http://localhost:5000/addReview', newReview);
      setReviews([response.data.review, ...reviews]);
      setComment('');
      setRating(0);
      setError('');
    } catch (error) {
      console.error('Error adding review:', error);
      setError('Failed to add your review. Please try again later.');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom color="primary" align="center">
        Reviews for this Story
      </Typography>

      {/* Form to add comment */}
      <Paper sx={{ padding: 3, boxShadow: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>Add your review</Typography>
        <TextField
          label="Your Comment"
          variant="outlined"
          fullWidth
          value={comment}
          onChange={handleCommentChange}
          multiline
          rows={4}
          sx={{ mb: 2 }}
        />
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">Rating:</Typography>
          <Rating
            name="rating"
            value={rating}
            onChange={handleRatingChange}
            precision={0.5}
            size="large"
          />
        </Box>
        {error && <Alert severity="error">{error}</Alert>}
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSubmitComment} 
          fullWidth
        >
          Submit Comment
        </Button>
      </Paper>

      {/* Reviews Grid */}
      <Grid container spacing={3}>
        {reviews.map((review) => (
          <Grid item xs={12} sm={6} md={4} key={review._id}>
            <Paper sx={{ padding: 2, boxShadow: 2 }}>
              <Typography variant="body1" paragraph>{review.comment}</Typography>
              <Box display="flex" alignItems="center">
                <Rating name="read-only" value={review.rating} readOnly precision={0.5} size="small" />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                  Rating: {review.rating}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ReviewPage;
