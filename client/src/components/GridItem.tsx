import { Link } from 'react-router-dom';
import { Item } from '../types/Types';
// import LikeButton from './LikeButton';
import { useAuth } from '../context/AuthContext';

interface GridItemProps {
  item: Item;
  // isLiked: boolean;
  fetchData: () => Promise<void>;
}

const GridItem = ({ item /*isLiked*/ }: GridItemProps) => {
  console.log('item', item);
  const { getUserProfile } = useAuth();

  const addToBasket = async (item: Item) => {
    const token = localStorage.getItem('token');
    console.log('token :>> ', token);
    console.log('item._id :>> ', item._id);
    if (!token) {
      console.log('No token found');
      alert(
        'Please register or login first! Click on the user icon in the top right corner. '
      );
      return;
    }
    const urlencoded = new URLSearchParams();
    urlencoded.append('productId', item._id);

    try {
      const response = await fetch(
        'http://localhost:5022/api/items/addItemsToCart',
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
      getUserProfile();
    } catch (error) {
      console.error('Error adding item to basket:', error);
    }
  };

  return (
    // <Link to={`/items/${item._id}`} className='block'>
    <div className='relative bg-gray-600 opacity-100 w-52 h-80 p-3 rounded-2xl cursor-pointer'>
      {item.image && (
        <Link to={`/items/${item._id}`}>
          <img
            src={item.image[0]?.url}
            alt={item.image[0]?.alt}
            className='w-full h-48 object-cover rounded-xl'
          />
        </Link>
      )}
      <h3 className='text-lg text-center font-bold mt-2 text-gray-100'>
        {item.name}
      </h3>
      <p className='text-gray-100'>{item.country}</p>
      {/* <p className='text-gray-100'>{item.likes?.length} Likes</p> */}
      <p className='text-gray-100'>{item.price.toFixed(2)} €</p>
      <div className='absolute bottom-3 right-3 w-13 bg-orange-300 p-2 -mb-1 rounded-full '>
        <button onClick={() => addToBasket(item)}>Add to Cart</button>
      </div>
      {/* Display price with € sign */}
      {/* <div className='absolute bottom-2 right-2 '> */}
      {/* <LikeButton itemId={item._id} isLiked={isLiked} fetchData={fetchData} /> */}
      {/* </div> */}
    </div>
    // </Link>
  );
};

export default GridItem;
