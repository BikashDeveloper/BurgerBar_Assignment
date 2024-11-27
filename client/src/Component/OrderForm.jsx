// src/components/OrderForm.js
import React, { useState } from 'react';
import Burger from './Burger';

const OrderForm = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [burgers, setBurgers] = useState([
    {
      slices: [
        { type: 'Aloo Tikki', quantity: 0, price: 30 },
        { type: 'Paneer', quantity: 0, price: 50 },
        { type: 'Cheese', quantity: 0, price: 40 },
      ],
      totalPrice: 0,
    },
  ]);

  const handleAddBurger = () => {
    setBurgers([
      ...burgers,
      {
        slices: [
          { type: 'Aloo Tikki', quantity: 0, price: 30 },
          { type: 'Paneer', quantity: 0, price: 50 },
          { type: 'Cheese', quantity: 0, price: 40 },
        ],
        totalPrice: 0,
      },
    ]);
  };

  const handleUpdateBurger = (burgerIndex, slices) => {
    const updatedBurgers = [...burgers];
    updatedBurgers[burgerIndex].slices = slices;
    updatedBurgers[burgerIndex].totalPrice = slices.reduce(
      (sum, slice) => sum + slice.quantity * slice.price,
      0
    );
    setBurgers(updatedBurgers);
  };

  const handleSubmitOrder = () => {
    const totalOrderPrice = burgers.reduce(
      (sum, burger) => sum + burger.totalPrice,
      0
    );

    const orderData = {
      mobileNumber,
      burgers,
      totalOrderPrice,
    };

    // Since we are not sending to the backend, just log the order data
    console.log('Order Data:', orderData);

    // Alert the user with the order details
    alert(`Order placed successfully! Total Price: ₹${totalOrderPrice}`);
  };

  const totalOrderPrice = burgers.reduce(
    (sum, burger) => sum + burger.totalPrice,
    0
  );

  const containerStyle = {
    maxWidth: '800px',
    margin: 'auto',
    padding: '24px',
    background: 'linear-gradient(to right, #9b59b6, #f39c12, #e74c3c)',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  };

  const titleStyle = {
    textAlign: 'center',
    fontSize: '2rem',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '24px',
  };

  const labelStyle = {
    fontSize: '1rem',
    fontWeight: '600',
    color: 'white',
    marginBottom: '8px',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    outline: 'none',
    transition: '0.3s',
  };

  const buttonStyle = {
    padding: '12px 24px',
    borderRadius: '8px',
    color: 'white',
    fontWeight: '600',
    cursor: 'pointer',
    transition: '0.3s',
  };

  const addButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#27ae60',
    borderColor: '#27ae60',
  };

  const submitButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#2ecc71',
    borderColor: '#2ecc71',
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Burger Order Form</h2>

      <div>
        {/* Mobile Number Input */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <label htmlFor="mobileNumber" style={labelStyle}>
            Mobile Number
          </label>
          <input
            id="mobileNumber"
            type="text"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            style={inputStyle}
            placeholder="Enter your mobile number"
          />
        </div>

        {/* Burgers */}
        <div style={{ marginTop: '24px' }}>
          {burgers.map((burger, index) => (
            <Burger
              key={index}
              burgerIndex={index}
              burger={burger}
              onUpdateBurger={handleUpdateBurger}
            />
          ))}
        </div>

        {/* Total Price */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px', fontSize: '1rem', fontWeight: '600', color: 'white' }}>
          <span>Total Order Price</span>
          <span>₹{totalOrderPrice}</span>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px' }}>
          <button
            onClick={handleAddBurger}
            style={addButtonStyle}
          >
            Add Another Burger
          </button>
          <button
            onClick={handleSubmitOrder}
            style={submitButtonStyle}
          >
            Submit Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
