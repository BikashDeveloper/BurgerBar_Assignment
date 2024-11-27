import React from 'react';
import BurgerSlice from './BurgerSlice';

const Burger = ({ burgerIndex, burger, onUpdateBurger }) => {
  const handleSliceChange = (sliceIndex, newQuantity) => {
    const updatedSlices = [...burger.slices];
    updatedSlices[sliceIndex].quantity = newQuantity;
    onUpdateBurger(burgerIndex, updatedSlices);
  };

  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow-md space-y-4">
      <h4 className="text-xl font-semibold">Burger #{burgerIndex + 1}</h4>
      {burger.slices.map((slice, index) => (
        <BurgerSlice
          key={index}
          slice={slice}
          onSliceChange={(newQuantity) => handleSliceChange(index, newQuantity)}
        />
      ))}
      <h5 className="font-bold text-lg">Total Price: ₹{burger.totalPrice}</h5>
    </div>
  );
};

export default Burger;
