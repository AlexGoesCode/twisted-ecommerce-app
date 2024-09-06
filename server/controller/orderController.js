import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';

export const placeOrder = async (req, res) => {
  console.log('place order');
  const user = req.user;
  const { items, shippingAddress, paymentMethod, totalPrice } = req.body;
  console.log('req.body', req.body);
  try {
    const newOrder = await orderModel.create({
      userId: user._id,
      items,
      shippingAddress,
      paymentMethod,
      totalPrice,
    });
    console.log('newOrder :>> ', newOrder);
    const placedOrder = await orderModel
      .findById({ _id: newOrder._id })
      .populate({ path: 'items', populate: { path: 'product' } });
    console.log('placedOrder :>> ', placedOrder);

    await userModel.updateOne(
      { _id: user._id },
      { $set: { shoppingCart: [] } }
    );

    return res.status(201).json(placedOrder);
  } catch (error) {
    console.log('error', error);
    res.status(500).json({ message: error.message });
  }
};

export const getUserOrders = async (req, res) => {
  console.log('getUserOrders');
  const { userId } = req.params;
  console.log('req.params :>> ', userId);
  try {
    const orders = await orderModel
      .find({ userId: userId })
      .populate('items.product');
    //send different responses depending on the scenario : no orders for that user, or an error...or any other possibility you think might happen

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    console.log('User in request :>> ', req.user);
    const userId = req.user._id;
    await userModel.updateOne({ _id: userId }, { $set: { shoppingCart: [] } });
    res.status(200).json({ message: 'Cart cleared successfully' });
  } catch (error) {
    console.log('Error clearing cart :>> ', error);
    res.status(500).json({ message: 'Failed to clear cart' });
  }
};
