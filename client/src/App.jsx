import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrderForm from './Component/OrderForm';

function App() {
  const [nextOrderNumber, setNextOrderNumber] = useState('');

  useEffect(() => {
    // Fetch the next order number from the backend
    axios
      .get('http://localhost:5000/api/orders/next')
      .then((response) => {
        setNextOrderNumber(response.data.nextOrderNumber);
      })
      .catch((error) => {
        console.error('Error fetching the next order number:', error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-gray-800">Welcome to the Burger App!</h1>
      <h2 className="text-xl font-semibold mt-4 text-gray-600">Order Number: {nextOrderNumber}</h2>
      <OrderForm nextOrderNumber={nextOrderNumber} />
    </div>
  );
}

export default App;
