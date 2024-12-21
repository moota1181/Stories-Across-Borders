import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardContent, Typography, Box, Rating, CircularProgress, Button, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar'; // Import Navbar component
import './Homepage.css'; // Import CSS

const Homepage = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getStories');
        setStories(response.data.stories);
      } catch (error) {
        console.error('Error fetching stories:', error);
        setError('Failed to load stories. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  const handleAddToCart = (storyId) => {
    console.log('Added to cart:', storyId);
  };

  const handleNavigateToUpdateUser = () => {
    navigate('/updateUser');
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" height="100vh" bgcolor="#f0f4f8">
        <CircularProgress color="secondary" />
        <Typography variant="h6" mt={2} color="text.primary">Loading stories...</Typography>
      </Box>
    );
  }

  return (
    <>
      <Navbar /> {/* Add Navbar at the top */}
      <Container sx={{ mt: 5, maxWidth: 'lg' }}>
        <Typography variant="h4" gutterBottom align="center" color="primary.main">
          Welcome to the Story Sharing Platform
        </Typography>

        {/* Error message display */}
        {error && <Alert severity="error" sx={{ mb: 2, bgcolor: 'error.light' }}>{error}</Alert>}

        <Grid container spacing={4}>
          {stories.map((story) => (
            <Grid item xs={12} sm={6} md={4} key={story._id}>
              <Card sx={{ borderRadius: 2, boxShadow: 3, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)', boxShadow: 6 } }}>
                {story.image && (
                  <img
                    src={story.image}
                    alt={story.title || "Story Image"}
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover',
                      borderTopLeftRadius: '8px',
                      borderTopRightRadius: '8px',
                    }}
                  />
                )}
                <CardContent sx={{ bgcolor: 'background.paper' }}>
                  <Typography variant="h6" component="div" color="text.primary" fontWeight="bold">
                    {story.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {story.content.slice(0, 100)}...
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={2}>
                    Destination: {story.destination}
                  </Typography>
                  <Rating name="read-only" value={story.averageRating || 0} readOnly precision={0.5} />
                  <Box mt={2}>
                    <Link to={`/story/${story._id}`} style={{ textDecoration: 'none' }}>
                      <Typography variant="body2" color="primary" sx={{ '&:hover': { textDecoration: 'underline' } }}>
                        Read more
                      </Typography>
                    </Link>
                  </Box>

                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleAddToCart(story._id)}
                    sx={{ marginTop: 2, boxShadow: 3, '&:hover': { backgroundColor: 'secondary.dark' } }}
                    component={Link} 
                    to="/CartPage"
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Homepage;
