import React, { useState } from 'react';
import './style.css';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      image: 'images/destination1.jpg',
      title: 'Beautiful Bali Escape',
      dates: 'Dates: 20th Jan - 27th Jan 2024',
      price: 1200
    }
  ]);

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const totalItems = cartItems.length;
  const totalCost = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div>

      {/* Main Content */}
      <main className="cart-container">
        <h2>Your Cart</h2>

        {/* Cart Items */}
        <section id="cart-items">
          {cartItems.map(item => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt="Destination" className="cart-item-image" />
              <div className="cart-item-details">
                <h3 className="cart-item-title">{item.title}</h3>
                <p className="cart-item-dates">{item.dates}</p>
                <p className="cart-item-price">${item.price}</p>
                <button className="remove-item-button" onClick={() => removeItem(item.id)}>Remove</button>
              </div>
            </div>
          ))}
        </section>

        {/* Cart Summary */}
        <aside className="cart-summary">
          <h3>Summary</h3>
          <p>Total Items: <span id="total-items">{totalItems}</span></p>
          <p>Total Cost: <span id="total-cost">${totalCost}</span></p>
          <button className="checkout-button">Proceed to Checkout</button>
        </aside>
      </main>

    </div>
  );
};

export default CartPage;
