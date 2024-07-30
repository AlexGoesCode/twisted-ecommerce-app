import express from 'express';
import itemModel from '../models/itemModel.js';
import { multerUpload } from '../';

//* Import all the functions from the recipesController
import { allItems, itemsByCountry } from '../controller/itemsController.js';

const itemsRouter = express.Router();

//* Define the routes for the items API
itemsRouter.get('/all', allItems); // ('/all', controller);
itemsRouter.get('/france', itemsByCountry);

// itemsRouter.put('/:itemid/rating', authMiddleware, rating);
export default itemsRouter;
