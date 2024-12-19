import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardContent, Typography, Box, Rating, CircularProgress, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import AddStoryModal from './AddStoryModal';

const Homepage = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  // Function to fetch stories from the backend
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getStories');
        setStories(response.data.stories);
      } catch (error) {
        console.error('Error fetching stories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  // Function to handle opening the modal
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  // Function to add a story to the cart
  const handleAddToCart = (storyId) => {
    console.log('Added to cart:', storyId);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" height="100vh">
        <CircularProgress />
        <Typography variant="h6" mt={2}>Loading stories...</Typography>
      </Box>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Welcome to the Story Sharing Platform
      </Typography>

      {/* زر Add Story */}
      <Box display="flex" justifyContent="center" mb={3}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleOpenModal}
          sx={{ marginRight: 2 }}
        >
          Add Story
        </Button>
      </Box>

      {/* زر Help and Support */}
      <Box display="flex" justifyContent="center" mb={3}>
        <Link to="/HelpandSupport" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="secondary">
            Help and Support
          </Button>
        </Link>
      </Box>

      <Grid container spacing={4}>
        {stories.map((story) => (
          <Grid item xs={12} sm={6} md={4} key={story._id}>
            <Card sx={{ borderRadius: 2, boxShadow: 3, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
              {story.image && (
                <img
                  src={story.image}
                  alt={story.title}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderTopLeftRadius: '8px',
                    borderTopRightRadius: '8px',
                  }}
                />
              )}
              <CardContent>
                <Typography variant="h6" component="div" color="text.primary">
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
                  sx={{ marginTop: 2 }}
                  component={Link} 
                  to="/cart"
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <AddStoryModal open={openModal} handleClose={handleCloseModal} />
    </Container>
  );
};

export default Homepage;
