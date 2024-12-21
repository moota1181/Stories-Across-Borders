import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardContent, Typography, Box, Rating, CircularProgress, Button, CardMedia } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import AddStoryModal from './AddStoryModal';

const Homepage = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  }); 
  const navigate = useNavigate();

  // Fetch all stories from the backend
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getStories');
        setStories(response.data.stories);
      } catch (error) {
        console.error('Error fetching stories:', error);
        alert('Failed to load stories. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  // Function to fetch a single story and add it to the cart
  const fetchStory = async (storyId) => {
    try {
      const response = await axios.get(`http://localhost:5000/getStories/${storyId}`);
      setCart((prevCart) => {
        const updatedCart = [...prevCart, response.data.story];
        localStorage.setItem('cart', JSON.stringify(updatedCart)); // Save cart to localStorage
        return updatedCart;
      });
    } catch (err) {
      console.error('Error fetching story details', err);
      alert('Failed to add story to cart. Please try again later.');
    }
  };

  // Open and close the modal
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  // Add a story to the cart and navigate to the cart page
  const handleAddToCart = async (storyId) => {
    await fetchStory(storyId); 
    
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

      <Box display="flex" justifyContent="center" mb={3}>
        <Link to="/HelpandSupport" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="secondary">
            Help and Support
          </Button>
        </Link>
      </Box>
      <Box display="flex" justifyContent="center" mb={3}>
        <Link to="/CartPage" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="secondary">
            Go to Cart
          </Button>
        </Link>
      </Box>
      <Grid container spacing={4}>
        {stories.map((story) => (
          <Grid item xs={12} sm={6} md={4} key={story._id}>
            <Card sx={{ borderRadius: 2, boxShadow: 3, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
              {story.image && (
                <CardMedia
                  component="img"
                  height="200"
                  image={story.image}
                  alt={story.title}
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
