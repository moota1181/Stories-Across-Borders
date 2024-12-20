import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const CartPage = () => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const navigate = useNavigate();

  // Function to remove an item from the cart
  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => item._id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Save updated cart to localStorage
  };

  const totalItems = cartItems.length;
  const totalCost = cartItems.reduce((total, item) => total + (item.price || 0), 0);

  return (
    <div>
      <main className="cart-container">
        <h2>Your Cart</h2>

        <button 
          className="return-home-button" 
          onClick={() => navigate('/Homepage')}
        >
          Return to Homepage
        </button>

        <section id="cart-items">
          {cartItems.map(item => (
            <div className="cart-item" key={item._id}>
              <img src={item.image} alt={item.title} className="cart-item-image" />
              <div className="cart-item-details">
                <h3 className="cart-item-title">{item.title}</h3>
                <p className="cart-item-destination">Destination: {item.destination}</p>
                <p className="cart-item-price">Price: ${item.price || 'N/A'}</p>
                <button 
                  className="remove-item-button" 
                  onClick={() => removeItem(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </section>

        <aside className="cart-summary">
          <h3>Summary</h3>
          <p>Total Items: <span id="total-items">{totalItems}</span></p>
          <p>Total Cost: <span id="total-cost">${totalCost.toFixed(2)}</span></p>
          <button className="checkout-button">Proceed to Checkout</button>
        </aside>
      </main>
    </div>
  );
};

export default CartPage;
