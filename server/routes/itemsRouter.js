import express from 'express';
import itemModel from '../models/itemModel.js';
import { allItems } from '../controller/itemsController.js';

const router = express.Router();

router.get('/all', allItems); // allItems is a controller

export default router;
