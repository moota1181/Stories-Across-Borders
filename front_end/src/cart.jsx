import React, { useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, IconButton, TextField, Box } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, title: 'Story Book 1', price: 15, quantity: 1 },
    { id: 2, title: 'Story Book 2', price: 25, quantity: 2 },
    { id: 3, title: 'Story Book 3', price: 10, quantity: 1 },
  ]);

  // Function to remove item from the cart
  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Function to update item quantity
  const handleQuantityChange = (id, quantity) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity } : item
    ));
  };

  // Function to calculate total price
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Your Cart
      </Typography>

      {/* Cart Items */}
      <Grid container spacing={3}>
        {cartItems.map(item => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" component="div" color="text.primary">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: ${item.price}
                </Typography>

                <Box display="flex" alignItems="center" mt={2}>
                  <TextField
                    label="Quantity"
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                    sx={{ width: 100 }}
                    inputProps={{ min: 1 }}
                  />
                  <IconButton onClick={() => handleRemoveItem(item.id)} color="error" sx={{ ml: 2 }}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Total Price */}
      <Box mt={4} display="flex" justifyContent="flex-end">
        <Typography variant="h6" color="text.primary">
          Total: ${calculateTotal()}
        </Typography>
      </Box>

      {/* Checkout Button */}
      <Box mt={3} display="flex" justifyContent="center">
        <Button variant="contained" color="primary">
          Proceed to Checkout
        </Button>
      </Box>
    </Container>
  );
};

export default CartPage;
