import { Link } from 'react-router-dom';
import { Item } from '../types/Types';
import LikeButton from './LikeButton';

interface GridItemProps {
  item: Item;
  isLiked: boolean;
  fetchData: () => Promise<void>;
}

const GridItem = ({ item, isLiked, fetchData }: GridItemProps) => {
  console.log('item', item);
  return (
    <Link to={`/items/${item._id}`} className='block'>
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
        {/* Display price with € sign */}
        <div className='absolute bottom-2 right-2 '>
          <LikeButton
            itemId={item._id}
            isLiked={isLiked}
            fetchData={fetchData}
          />
        </div>
      </div>
    </Link>
  );
};

export default GridItem;
