import express from 'express';
import authMiddleware from '../middleware/auth.js';
// import itemModel from '../models/itemModel.js';
// import { multerUpload } from '../middleware/multer.js'; // useful for file upload route

//* Import all the functions from the itemsController
import {
  getCart,
  addItemsToCart,
  removeItemsFromCart,
  deleteItemsFromCart,
  checkout,
  allItems,
  getItemById,
  itemsByCountry,
  itemsByName,
  clearCart,
} from '../controller/itemsController.js';

const itemsRouter = express.Router();

//* Define the routes for the items API
itemsRouter.get('/all', allItems); // ('/all', controller);
itemsRouter.get('/france', itemsByCountry);
itemsRouter.get('/all/productsBy', itemsByName);

itemsRouter.get('/cart', authMiddleware, getCart);
itemsRouter.get('/:itemId', getItemById);
itemsRouter.patch('/addItemsToCart', authMiddleware, addItemsToCart);
itemsRouter.patch('/removeItemsFromCart', authMiddleware, removeItemsFromCart);
itemsRouter.delete('/deleteItemsFromCart', authMiddleware, deleteItemsFromCart);
itemsRouter.post('/checkout', authMiddleware, checkout);
itemsRouter.post('/clearCart', authMiddleware, clearCart);
// API list is ordered - /cart and then /:itemId

// itemsRouter.put('/:itemid/rating', authMiddleware, rating);
export default itemsRouter;
