import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Box, Button, TextField, Snackbar, Alert } from '@mui/material';

const AddStoryModal = ({ open, handleClose, refreshStories }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    destination: '',
    image: null,
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      setError('You need to be logged in to add a story.');
      return;
    }
  
    const data = new FormData();
    data.append('title', formData.title);
    data.append('content', formData.content);
    data.append('destination', formData.destination);
    if (formData.image) {
      data.append('image', formData.image);
    }
  
    try {
      await axios.post('http://localhost:5000/addStory', data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });
  
      handleClose(); // إغلاق المودال
      refreshStories(); // تحديث القصص
    } catch (error) {
      console.error('Error adding story:', error.response?.data || error.message);
    }
  };
  

  return (
    <>
      {error && (
        <Snackbar
          open={error !== null}
          autoHideDuration={6000}
          onClose={() => setError(null)}
        >
          <Alert severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      )}

      <Modal open={open} onClose={handleClose}>
        <Box sx={{ p: 4, bgcolor: 'white', mx: 'auto', my: '20%', width: '400px', borderRadius: 2 }}>
          <h3>Add a New Story</h3>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            margin="normal"
            required
            multiline
            rows={4}
          />
          <TextField
            fullWidth
            label="Destination"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            margin="normal"
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ margin: '16px 0' }}
          />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Add Story
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default AddStoryModal;
