import orderModel from '../models/orderModel.js';

export const placeOrder = async (req, res) => {
  console.log('place order');
  const user = req.user;
  const { items, shippingAddress, paymentMethod, totalPrice } = req.body;
  console.log('req.body', req.body);
  try {
    // const newOrder = new orderModel({
    //   userId: user._id,
    //   items,
    //   shippingAddress,
    //   paymentMethod,
    //   totalPrice,
    // });
    // console.log('newOrder :>> ', newOrder);
    // const savedOrder = await newOrder.save();
    // const populatedOrder = await savedOrder.populate('items');

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
