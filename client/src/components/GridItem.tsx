import { Link } from 'react-router-dom';
import { Item } from '../types/Types';
// import LikeButton from './LikeButton';
import { useAuth } from '../context/AuthContext';
import { baseUrl } from '../config';
import { useState } from 'react';

interface GridItemProps {
  item: Item;
  // isLiked: boolean;
  fetchData: () => Promise<void>;
}

const GridItem = ({ item /*fetchData*/ /*isLiked*/ }: GridItemProps) => {
  console.log('item', item);
  const { getUserProfile } = useAuth();
  const [showBubble, setShowBubble] = useState(false);

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
      const response = await fetch(`${baseUrl}/items/addItemsToCart`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${token}`,
        },
        body: urlencoded,
      });

      if (!response.ok) {
        throw new Error('Failed to add item to basket');
      }

      const result = await response.json();
      console.log('Item added to basket', result);

      // fetchData();
      getUserProfile();
      // alert('Item added to the Cart');
      setShowBubble(true);
      setTimeout(() => setShowBubble(false), 1500);
    } catch (error) {
      console.error('Error adding item to basket:', error);
    }
  };

  return (
    // <Link to={`/items/${item._id}`} className='block'>
    <div
      className='relative bg-gray-600 opacity-100 w-11/12 max-h-full sm:min-h-0 sm:w-52 sm:h-80 p-3 rounded-2xl cursor-pointer flex flex-col justify-between'
      // style={{ transform: 'translateX(-20px)' }}
    >
      {item.image && (
        <div className='relative'>
          <Link to={`/items/${item._id}`}>
            <img
              src={item.image[0]?.url}
              alt={item.image[0]?.alt}
              className='w-full h-96 sm:w-full sm:h-48 object-cover rounded-xl'
            />
          </Link>
          <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
            <div className='bg-gray-700 bg-opacity-60 text-gray-100 px-2 py-2 rounded-full'>
              tap!
            </div>
          </div>
        </div>
      )}
      <h3 className='text-lg text-center font-bold mt-2 text-gray-100'>
        {item.name}
      </h3>
      <p className='text-gray-100 font-semibold'>{item.country}</p>
      {/* <p className='text-gray-100'>{item.likes?.length} Likes</p> */}
      <p className='text-gray-100 font-semibold'>{item.price.toFixed(2)} €</p>
      <div className='absolute bottom-3 right-3 w-13 bg-orange-300 p-2 -mb-1 rounded-full '>
        <button onClick={() => addToBasket(item)}>Add to Cart</button>
        {showBubble && (
          <div className='absolute top-0 right-0 bg-red-500 text-white px-2 py-1 rounded-full animate-driftUp'>
            +1
          </div>
        )}
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
