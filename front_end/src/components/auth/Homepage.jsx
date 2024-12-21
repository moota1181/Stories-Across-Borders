import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardContent, Typography, Box, Rating, CircularProgress, Button,AppBar, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';

import AddStoryModal from './AddStoryModal';
import  './Homepage.css';
import logo from "./assets/final.jpg"; 







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
    <div>
    
    
   {/* Nav */}
{/* Nav */}
<AppBar position="static" style={{ backgroundColor: "#1093BD", height: 190 }}>
  <Toolbar style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    {/* Logo */}
    <div style={{ display: "flex", alignItems: "center" }}>
      
      <img
        src={logo}
        alt="Logo"
        style={{
          height: "170px",
          width: "auto",
          marginLeft: "360px",
          cursor: "pointer",
        }}
      />
    </div>

    {/* Buttons with Typography */}
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: "400px", marginTop: "75px" }}>
      {/* Typography */}
      <Typography
        variant="h6"
        style={{
          color: "white",
          fontFamily: '"PT Serif", serif',
          marginBottom: "10px",
          fontSize:"40px",
          fontWeight: 400,
        }}
      >
        Share us your stories
      </Typography>
      {/* Buttons */}
      <div style={{ display: "flex", gap: "10px" }}>
      <Link to="/AddStoryModal" style={{ textDecoration: "none" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenModal}
          style={{
            
            backgroundColor: "#0A4F8C",
            fontSize: "15px",
            color: "white",
            fontFamily: '"PT Serif", serif',
          }}
        >
          Write a Story
        </Button>
        </Link>
        <Link to="/HelpandSupport" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="primary"
            style={{
              backgroundColor: "#0A4F8C",
              fontSize: "15px",
              color: "white",
              fontFamily: '"PT Serif", serif',
            }}
          >
            Help and Support
          </Button>
          
        </Link>
        
        <Link to="/Review" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="primary"
            style={{
              backgroundColor: "#0A4F8C",
              fontSize: "15px",
              color: "white",
              fontFamily: '"PT Serif", serif',
            }}
          >
            Review 
          </Button>
          
        </Link>
        
        <Link to="/UpdateUser" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="primary"
            style={{
              backgroundColor: "#0A4F8C",
              fontSize: "15px",
              color: "white",
              fontFamily: '"PT Serif", serif',
            }}
          >
            Change user name
          </Button>
        </Link>
        
      </div>
    </div>
    <div>
    <Link to="/Login" style={{ textDecoration: "none" }}>
      <Button
        variant="contained"
        color="primary"
        style={{
          backgroundColor: "#0A4F8C",
          fontSize: "15px",
          color: "white",
          fontFamily: '"PT Serif", serif',
          marginRight: "20px",
        }}
       
      >
        Logout
      </Button>
      </Link>
    </div>
  </Toolbar>
</AppBar>

    <div className='homepage'></div>
  
    <Container>
  
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
                <Typography variant="body2" color="text.primary" paragraph>
                  {story.content.slice(0, 100)}...
                </Typography>
                <Typography variant="body2" color="text.primary" mb={2}>
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
                  color="primary"
                  onClick={() => handleAddToCart(story._id)}
                  sx={{ backgroundColor:"#1093BD" ,marginTop: 2 }}
                  component={Link} to="/cartPage"
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      
    </Container>
    </div>
  );
};

export default Homepage;
