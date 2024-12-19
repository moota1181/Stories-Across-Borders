import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const HelpPage = () => {
  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h4" gutterBottom align="center" color="primary">
          Help and Support
        </Typography>

        <Typography variant="body1" paragraph>
          Welcome to our help page. If you have any questions or need assistance, feel free to reach out to us.
        </Typography>

        <Typography variant="body1" paragraph>
          Our support team is available to assist you with any issues or questions you may have.
        </Typography>

        <Typography variant="body1" paragraph>
          Email us at: <a href="mailto:support@storyplatform.com">support@storyplatform.com</a>
        </Typography>

        <Typography variant="body1" paragraph>
          Or call us at: +1 (800) 123-4567
        </Typography>
      </Box>
    </Container>
  );
};

export default HelpPage;
