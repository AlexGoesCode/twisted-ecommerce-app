import express from 'express';
import itemModel from '../models/itemModel.js';
import { allItems, itemsByCountry } from '../controller/itemsController.js';

const router = express.Router();

router.get('/all', allItems); // ('/all', controller);
router.get('/France', itemsByCountry);

export default router;
