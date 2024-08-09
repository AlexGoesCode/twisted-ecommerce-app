import { Link } from 'react-router-dom';
import { Item } from '../types/Types';
// import LikeButton from './LikeButton';

interface GridItemProps {
  item: Item;
  isLiked: boolean;
  fetchData: () => Promise<void>;
}

const GridItem = ({ item, /*isLiked*/ fetchData }: GridItemProps) => {
  console.log('item', item);

  const addToBasket = async (item: Item) => {
    const token = localStorage.getItem('token');
    console.log('token :>> ', token);
    console.log('item._id :>> ', item._id);
    if (!token) {
      console.log('No token found');
      return;
    }
    const urlencoded = new URLSearchParams();
    urlencoded.append('productId', item._id);
    try {
      const response = await fetch(
        'http://localhost:5022/api/items/addProductToCart',
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${token}`,
          },
          body: urlencoded,
        }
      );

      if (!response.ok) {
        throw new Error('Failed to add item to basket');
      }

      const result = await response.json();
      console.log('Item added to basket', result);

      // fetchData();
    } catch (error) {
      console.error('Error adding item to basket:', error);
    }
  };

  return (
    // <Link to={`/items/${item._id}`} className='block'>
    <div className='relative bg-gray-600 opacity-100 max-w-60 min-h-96 p-4 border rounded-2xl shadow-md cursor-pointer'>
      {item.image && (
        <Link to={`/items/${item._id}`}>
          <img
            src={item.image[0].url}
            alt={item.imageAlt}
            className='w-full h-48 object-cover rounded-xl'
          />
        </Link>
      )}
      <h3 className='text-lg font-bold mt-2 text-gray-100'>{item.name}</h3>
      <p className='text-gray-100'>{item.country}</p>
      <p className='text-gray-100'>{item.likes?.length} Likes</p>
      <p className='text-gray-100'>{item.price.toFixed(2)} €</p>
      <button onClick={() => addToBasket(item)}>Add to Cart</button>
      {/* Display price with € sign */}
      <div className='absolute bottom-2 right-2 '>
        {/* <LikeButton itemId={item._id} isLiked={isLiked} fetchData={fetchData} /> */}
      </div>
    </div>
    // </Link>
  );
};

export default GridItem;
