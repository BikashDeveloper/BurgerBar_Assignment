const Counter = require("../models/Counter");
const Order = require("../models/Order");

// Generate Order Number
const generateOrderNumber = async () => {
  const counter = await Counter.findOneAndUpdate(
    { name: "order" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return `BURG-${String(counter.seq).padStart(3, "0")}`;
};

// Add or Update Order
exports.addOrUpdateOrder = async (req, res) => {
  const { mobileNumber, burgers } = req.body;

  try {
    let totalOrderPrice = 0;
    burgers.forEach((burger) => {
      burger.totalPrice = burger.slices.reduce(
        (sum, slice) => sum + slice.quantity * slice.price,
        0
      );
      totalOrderPrice += burger.totalPrice;
    });

    let order = await Order.findOne({ mobileNumber });

    if (order) {
      order.burgers = burgers;
      order.totalOrderPrice = totalOrderPrice;
    } else {
      const orderNumber = await generateOrderNumber();
      order = new Order({
        orderNumber,
        mobileNumber,
        burgers,
        totalOrderPrice,
      });
    }

    await order.save();
    res
      .status(200)
      .json({ message: "Order added/updated successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Failed to process order", error });
  }
};

// Get Next Order Number
exports.getNextOrderNumber = async (req, res) => {
  try {
    const counter = await Counter.findOne({ name: "order" });
    const nextOrderNumber = `BURG-${String((counter?.seq || 0) + 1).padStart(
      3,
      "0"
    )}`;
    res.status(200).json({ nextOrderNumber });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch next order number", error });
  }
};

// Increase Slice Quantity
exports.increaseSliceQuantity = async (req, res) => {
  const { orderNumber, burgerIndex, sliceIndex } = req.body;

  try {
    let order = await Order.findOne({ orderNumber });

    if (order) {
      let burger = order.burgers[burgerIndex];
      let slice = burger.slices[sliceIndex];
      slice.quantity += 1; // Increase quantity by 1
      burger.totalPrice = burger.slices.reduce(
        (sum, slice) => sum + slice.quantity * slice.price,
        0
      );
      order.totalOrderPrice = order.burgers.reduce(
        (sum, burger) => sum + burger.totalPrice,
        0
      );

      await order.save();
      res.status(200).json({ message: "Slice quantity increased", order });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update slice quantity", error });
  }
};

// Decrease Slice Quantity
exports.decreaseSliceQuantity = async (req, res) => {
  const { orderNumber, burgerIndex, sliceIndex } = req.body;

  try {
    let order = await Order.findOne({ orderNumber });

    if (order) {
      let burger = order.burgers[burgerIndex];
      let slice = burger.slices[sliceIndex];
      if (slice.quantity > 0) slice.quantity -= 1; // Decrease quantity by 1
      burger.totalPrice = burger.slices.reduce(
        (sum, slice) => sum + slice.quantity * slice.price,
        0
      );
      order.totalOrderPrice = order.burgers.reduce(
        (sum, burger) => sum + burger.totalPrice,
        0
      );

      await order.save();
      res.status(200).json({ message: "Slice quantity decreased", order });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update slice quantity", error });
  }
};
