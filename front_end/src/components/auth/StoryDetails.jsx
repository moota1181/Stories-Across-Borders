import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Box, Typography, CircularProgress, Alert, Button } from '@mui/material';

const StoryDetails = () => {
  const { storyId } = useParams(); // Get the storyId from the URL params
  const [story, setStory] = useState(null); // State to store the story
  const [loading, setLoading] = useState(true); // State to store loading state
  const [error, setError] = useState(null); // State to store error messages

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/getStories/${storyId}`); // Fetch the story by storyId
        setStory(response.data.story); // Store the story in state
      } catch (err) {
        setError('Error fetching story details'); // Set error message if something goes wrong
      } finally {
        setLoading(false); // Stop loading after the data is fetched
      }
    };

    fetchStory();
  }, [storyId]); // Fetch story details when storyId changes

  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <CircularProgress />
    </Box>
  ); // Show loading spinner while data is being fetched

  if (error) return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Alert severity="error">{error}</Alert>
    </Box>
  ); // Show error message if there's an issue fetching data

  if (!story) return <div>No story found</div>; // Show message if the story is not found

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h3" gutterBottom>{story.title}</Typography>
        <Typography variant="body1" paragraph>{story.content}</Typography>
        <Typography variant="h6" color="text.secondary" mb={2}>
          Destination: {story.destination}
        </Typography>
        
        {story.image && (
          <Box mb={3}>
            <img
              src={story.image}
              alt={story.title}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              }}
            />
          </Box>
        )}

        <Button variant="contained" color="primary" onClick={() => window.history.back()}>
          Go Back
        </Button>
      </Box>
    </Container>
  );
};

export default StoryDetails;
