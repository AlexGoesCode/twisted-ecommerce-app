import itemModel from '../models/itemModel.js';

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

//* Function that tries to like an item. -> 200, 400 or 500
// const likeItem = async (req, res) => {
//     const
// }

export { allItems, itemsByCountry, getItemById };
