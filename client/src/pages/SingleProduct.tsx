import { useParams, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Item, SingleItemOkResponse } from '../types/Types';
// import { BasketContext } from '../context/BasketContext';

function SingleProduct() {
  const [item, setItem] = useState<Item | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { itemid } = useParams<{ itemid: string }>();
  const navigate = useNavigate();

  const fetchItem = async () => {
    const url = `http://localhost:5022/api/items/${itemid}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = (await response.json()) as SingleItemOkResponse;
      if (result.error) {
        throw new Error(result.message);
      }
      setItem(result.data);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  useEffect(() => {
    if (itemid) {
      fetchItem();
    }
  }, [itemid]);
  console.log('item', item);

  const handleLikeItem = async () => {
    const url = `http://localhost:5022/api/items/${itemid}/like`;
    try {
      const response = await fetch(url, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to like item');
      }

      const result = await response.json();
      console.log('Item liked', result);

      if (item) {
        setItem({ ...item, likes: result.likes });
      }
    } catch (error) {
      console.error('Error liking item:', error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  if (error) {
    return <div style={{ color: 'white' }}>Error: {error}</div>;
  }

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <main className='mt-8 flex justify-center items-center bg-eggshell'>
      <article className='bg-white rounded-3xl max-w-5xl h-auto flex flex-col md:flex-row'>
        <div className='md:w-1/2 flex justify-center items-center p-4'>
          <div className='w-full'>
            <img
              src={item.image[0].url}
              alt={`Photo of ${item.image[0].alt}`}
              className='w-full h-2/3 object-cover rounded-2xl'
              style={{ aspectRatio: '3 / 4' }}
            />
          </div>
        </div>
        <div className='relative px-8 py-4 font-outfit text-wenge-brown md:w-1/2'>
          <button
            className='absolute top-4 right-6 w-20 bg-orange-400 p-2 rounded-full'
            onClick={handleBack}
          >
            Back
          </button>
          <h1 className='font-fancy text-4xl text-center mt-20 mb-4 text-dark-charcoal'>
            {item.name}
          </h1>
          <div className='flex justify-between mb-16 text-xl '>
            <p className='mt-6 m-5'>Price: {item.price}</p>
            {/* <p className='mt-6'>In stock: {item.inStock}</p> */}
            <p className='mt-6'>Country: {item.country}</p>
          </div>
          <div className='flex justify-between mb-16'>
            <div className='w-1/2 pl-2'>
              <h2 className='text-dark-raspberry text-xl ml-2'>Likes</h2>
              <div className='ml-8 flex items-center text-lg'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='red'
                  className='w-6 h-6 mr-2'
                  onClick={handleLikeItem} // Add onClick handler for liking the recipe
                >
                  <path
                    fillRule='evenodd'
                    d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'
                    clipRule='evenodd'
                  />
                </svg>
                {item.likes?.length}
              </div>
            </div>
          </div>
          <div className='flex mt-8'>
            <div className='w-1/2 pl-4'>
              <h3 className='font-fancy text-2xl text-nutmeg'>Description</h3>
              <p className='mt-4 ml-6'>{item.body}</p>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}

export default SingleProduct;
