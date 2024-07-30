import itemModel from '../models/itemModel.js';

const allItems = async (req, res) => {
  try {
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
};

const itemsByCountry = async (req, res) => {
  console.log('req :>> '.yellow, req);
};

//* Function that tries to like a recipe. -> 200, 400 or 500
// const likeItem = async (req, res) => {
//     const
// }

export { allItems, itemsByCountry };
