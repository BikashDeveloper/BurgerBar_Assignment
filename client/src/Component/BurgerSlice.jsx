import React from 'react';

const BurgerSlice = ({ slice, onSliceChange }) => {
  const handleIncrease = () => {
    onSliceChange(slice.quantity + 1);
  };

  const handleDecrease = () => {
    if (slice.quantity > 0) {
      onSliceChange(slice.quantity - 1);
    }
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <span className="text-lg">{slice.type}</span>
        <span className="text-sm text-gray-500">₹{slice.price}</span>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={handleDecrease}
          className="bg-red-500 text-white p-2 rounded-full"
        >
          -
        </button>
        <span>{slice.quantity}</span>
        <button
          onClick={handleIncrease}
          className="bg-green-500 text-white p-2 rounded-full"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default BurgerSlice;
