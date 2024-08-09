import itemModel from '../models/itemModel.js';
import userModel from '../models/userModel.js';

const allItems = async (req, res) => {
  try {
    const allItems = await itemModel.find({});
    console.log('allItems :>> ', allItems);

    res.status(200).json({
      number: allItems.length,
      allItems,
    });
  } catch (error) {
    console.log('error :>> ', error);
    res.status(400).json({
      message: 'something went wrong',
    });
  }
};

const itemsByCountry = async (req, res) => {
  console.log('req :>> '.yellow, req);
};

const getItemById = async (req, res) => {
  try {
    const itemId = req.params.itemId; // req.params.itemId: ID we fetch from URL
    console.log('itemID :>> ', itemId);
    const item = await itemModel.findById(itemId);

    if (!item) {
      res.status(404).json({
        message: 'No item with this ID',
        data: null,
        error: false,
      });
      return;
    }
    res.status(200).json({
      message: 'Item found',
      data: item,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong',
      data: null,
      error: true,
    });
  }
};

const addProductToCart = async (req, res) => {
  try {
    // Extract user from request
    const user = req.user;
    // Extract product ID from request body
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }
    // Find user in the database
    const userRecord = await userModel.findByIdAndUpdate(user._id);

    if (!userRecord) {
      return res.status(404).json({ message: 'User not found ' });
    }
    // add product ID to user's shop.cart
    userRecord.shoppingCart.push(productId);

    // save updated document
    await userRecord.save();

    // send success response
    res.status(200).json({ message: 'Product added to cart successfully ' });
  } catch (error) {
    console.error('Error adding product to cart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export { allItems, itemsByCountry, getItemById, addProductToCart };
