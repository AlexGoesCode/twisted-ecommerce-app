// orderController.js
import Order from '../models/orderModel.js';

export const placeOrder = async (req, res) => {
  const { userId, items, shippingAddress, paymentMethod, totalPrice } =
    req.body;
  try {
    const newOrder = new Order({
      user: userId,
      items,
      shippingAddress,
      paymentMethod,
      totalPrice,
    });
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserOrders = async (req, res) => {
  const { userId } = req.params;
  try {
    const orders = await Order.find({ user: userId });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
