import express from 'express';
import itemModel from '../models/itemModel.js';

const router = express.Router();

router.get('/all', async (req, res) => {
  try {
    console.log('testing');
    const allItems = await itemModel.find({});
    console.log('allItems :>> ', allItems);

    res.status(200).json({
      number: allItems.lenght,
      allItems,
    });
  } catch (error) {
    console.log('error :>> ', error);
    res.status(400).json({
      message: 'something went wrong',
    });
  }
});

export default router;
