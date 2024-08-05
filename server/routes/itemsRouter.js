import express from 'express';
import authMiddleware from '../middleware/auth.js';
import itemModel from '../models/itemModel.js';
import { multerUpload } from '../middleware/multer.js';

//* Import all the functions from the itemsController
import {
  allItems,
  getItemById,
  itemsByCountry,
} from '../controller/itemsController.js';

const itemsRouter = express.Router();

//* Define the routes for the items API
itemsRouter.get('/all', allItems); // ('/all', controller);
itemsRouter.get('/france', itemsByCountry);
itemsRouter.get('/id', getItemById);

// itemsRouter.put('/:itemid/rating', authMiddleware, rating);
export default itemsRouter;
