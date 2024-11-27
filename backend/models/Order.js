const mongoose = require('mongoose');

const sliceSchema = new mongoose.Schema({
  type: { type: String, required: true },
  quantity: { type: Number, required: true, default: 0 },
  price: { type: Number, required: true },
});

const burgerSchema = new mongoose.Schema({
  slices: [sliceSchema],
  totalPrice: { type: Number, default: 0 },
});

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true },
  mobileNumber: { type: String, required: true },
  burgers: [burgerSchema],
  totalOrderPrice: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
