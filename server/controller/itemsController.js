import itemModel from '../models/itemModel.js';
import userModel from '../models/userModel.js';
import orderModel from '../models/orderModel.js';

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

const itemsByName = async (req, res) => {
  // console.log('req :>> ', req);
  console.log('req :>> ', typeof req.query.name);
  console.log('req.query :>> ', req.query);

  const searchQuery = Object.entries(req.query)[0];
  console.log('searchQuery :>> ', searchQuery);
  const searchPropertyName = searchQuery[0];
  const searchPropertyValue = searchQuery[1];

  if (!searchPropertyValue) {
    const allItems = await itemModel.find({});
    return res.status(200).json({
      number: allItems.length,
      allItems,
    });
  }

  if (searchPropertyValue) {
    const allItems = await itemModel.find({
      [searchPropertyName]: {
        $regex: searchPropertyValue.toString(),
        $options: 'i',
      },
    });
    console.log('itemsBYname :>> ', allItems);
    return res.status(200).json({
      number: allItems.length,
      allItems,
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

const getCart = async (req, res) => {
  console.log('req.user :>> ', req.user);
  try {
    const user = req.user;

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({
      message: 'Shopping cart fetched successfully',
      shoppingCart: user.shoppingCart,
    });
  } catch (error) {
    console.log('Error fetching shopping cart:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const addItemsToCart = async (req, res) => {
  console.log('add to cart runnning');
  console.log('req.user :>> ', req.user);
  try {
    // Extract user from request
    const user = req.user;
    // Extract product ID from request body
    const { productId } = req.body;
    console.log('user.shoppingCart :>> ', user.shoppingCart.length);

    if (!productId) {
      console.log('ln61');
      return res.status(400).json({ message: 'Product ID is required' });
    }

    if (!user) {
      console.log('ln65');
      return res.status(404).json({ message: 'User not found ' });
    }

    // Check if the product is already in the cart

    const existingItem = user.shoppingCart.find((item) => {
      console.log('item :>> ', item.product._id.toString() === productId);
      return item.product._id.toString() === productId;
    });
    console.log('existingItem :>> ', existingItem);

    if (existingItem) {
      console.log('existing item ln 86');
      const newQuantity = existingItem.quantity + 1;

      // If item exists, increase the quantity
      try {
        const userIncreasingCart = await userModel.findOneAndUpdate(
          { _id: user._id, 'shoppingCart.product': productId },

          {
            $set: {
              'shoppingCart.$.product': productId,
              'shoppingCart.$.quantity': newQuantity,
            },
          },

          { new: true }
        );
        console.log('userIncreasingCart :>> ', userIncreasingCart);
        return res.status(200).json({
          message: 'Product added to cart successfully, and quantity updated ',

          userIncreasingCart,
        });
      } catch (error) {
        console.log(
          'error, adding product when product already exist in cart :>> ',
          error
        );
      }
    }

    if (!existingItem) {
      // If item does not exist, we update the quantity property in Items collection and push the id of the product to the shoppingCart array
      try {
        const userItemNotInCart = await userModel.updateOne(
          { _id: user._id },
          { $addToSet: { shoppingCart: { quantity: 1, product: productId } } },
          { new: true }
        );
        // send success response
        return res.status(200).json({
          message: 'Product added to cart successfully, and quantity updated ',

          userItemNotInCart,
        });
      } catch (error) {
        console.log(
          'error, adding product when product DO NOT exist in cart already :>> ',
          error
        );
      }
    }
  } catch (error) {
    console.error('Error adding product to cart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const removeItemsFromCart = async (req, res) => {
  const user = req.user;
  const productId = req.body.productId;

  const existingItem = user.shoppingCart.find((item) => {
    return item.product._id.toString() === productId;
  });
  if (existingItem.quantity > 1) {
    const newQuantity = existingItem.quantity - 1;

    // If item exists, decrease the quantity
    try {
      const userIncreasingCart = await userModel.findOneAndUpdate(
        { _id: user._id, 'shoppingCart.product': productId },

        {
          $set: {
            'shoppingCart.$.product': productId,
            'shoppingCart.$.quantity': newQuantity,
          },
        },

        { new: true }
      );
      return res.status(200).json({
        message: 'Product added to cart successfully, and quantity updated ',

        userIncreasingCart,
      });
    } catch (error) {
      console.log(
        'error, adding product when product already exist in cart :>> ',
        error
      );
    }
  }

  if (existingItem.quantity === 1) {
    try {
      const userIncreasingCart = await userModel.findOneAndUpdate(
        { _id: user._id, 'shoppingCart.product': productId },

        {
          $pull: { shoppingCart: { product: productId } },
        },

        { new: true }
      );
      return res.status(200).json({
        message: 'Product removed to cart successfully, and quantity updated ',

        userIncreasingCart,
      });
    } catch (error) {
      console.log(
        'error, adding product when product already exist in cart :>> ',
        error
      );
    }
  }
};

const deleteItemsFromCart = async (req, res) => {
  const user = req.user;
  const productId = req.body.productId;

  try {
    const existingItem = user.shoppingCart.find((item) => {
      return item.product._id.toString() === productId;
    });

    if (!existingItem) {
      return res.status(404).json({
        message: 'Product not found in cart',
      });
    }

    const updatedUser = await userModel.findOneAndUpdate(
      { _id: user._id },
      { $pull: { shoppingCart: { product: productId } } },
      { new: true }
    );
    return res.status(200).json({
      message: 'Product removed from cart successfully',
      updatedUser,
    });
  } catch (error) {
    console.log('Error removing product from cart:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const checkout = async (req, res) => {
  const user = req.user;
  const { shippingAddress, paymentMethod } = req.body;

  try {
    // validate cart items
    // Create an order
    // Clear the user's cart after placing the order
    // Optionally, send a confirmation email here
  } catch (error) {}
};

export {
  checkout,
  allItems,
  itemsByName,
  itemsByCountry,
  getCart,
  getItemById,
  addItemsToCart,
  removeItemsFromCart,
  deleteItemsFromCart,
};
