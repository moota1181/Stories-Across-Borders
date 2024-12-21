// Navbar.js
import React from 'react';
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Story Sharing Platform
        </Typography>
        <Box>
          <Button color="primary" component={Link} to="/AddStoryModal">
            Add Story
          </Button>
          <Button color="primary" component={Link} to="/HelpandSupport">
            Help and Support
          </Button>
          <Button color="primary" component={Link} to="/Review">
            Review
          </Button>
          <Button color="primary" component={Link} to="/updateUser">
            Update User Information
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
