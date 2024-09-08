import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Item, SingleItemOkResponse } from '../types/Types';
// import Carousel from 'react-multi-carousel';
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

  // const handleLikeItem = async () => {
  //   const url = `http://localhost:5022/api/items/${itemid}/like`;
  //   try {
  //     const response = await fetch(url, {
  //       method: 'POST',
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to like item');
  //     }

  //     const result = await response.json();
  //     console.log('Item liked', result);

  //     if (item) {
  //       setItem({ ...item, likes: result.likes });
  //     }
  //   } catch (error) {
  //     console.error('Error liking item:', error);
  //     if (error instanceof Error) {
  //       setError(error.message);
  //     } else {
  //       setError('An unknown error occurred');
  //     }
  //   }
  // };

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  if (error) {
    return <div style={{ color: 'white' }}>Error: {error}</div>;
  }

  if (!item) {
    return <div>Loading...</div>;
  }

  // const responsive = {
  //   desktop: {
  //     breakpoint: { max: 3000, min: 1024 },
  //     items: 1,
  //   },
  //   tablet: {
  //     breakpoint: { max: 1024, min: 464 },
  //     items: 1,
  //   },
  //   mobile: {
  //     breakpoint: { max: 464, min: 0 },
  //     items: 1,
  //   },
  // };

  return (
    <main className='flex justify-center items-center bg-eggshell p-4 md:p-10'>
      <article className='bg-white rounded-2xl shadow-lg max-w-full md:max-w-5xl max-h-full flex flex-col md:flex-row'>
        <div className='w-full md:w-1/2 flex justify-center items-center p-4'>
          <div className='w-full flex justify-center'>
            <img
              src={item.image[0].url}
              alt={`Photo of ${item.image[0].alt}`}
              className='w-full md:w-5/6 object-cover rounded-2xl'
              style={{ aspectRatio: '3 / 4' }}
            />
          </div>
        </div>
        <div className='relative px-4 py-4 md:px-8 md:py-4 font-outfit text-wenge-brown w-full md:w-1/2'>
          <button
            className='absolute top-4 right-4 md:right-6 w-16 md:w-20 bg-orange-300 p-2 md:p-3 rounded-full'
            onClick={handleBack}
          >
            Back
          </button>
          <h1 className='text-xl md:text-2xl text-center mt-16 md:mt-20 mb-4 text-dark-charcoal'>
            {item.name}
          </h1>
          <div className='flex flex-col md:flex-row justify-between mb-8 md:mb-16 text-lg md:text-xl'>
            <p className='m-1 md:m-6'>Price: {item.price.toFixed(2)} €</p>
            <p className='m-1 md:m-6'>Country: {item.country}</p>
          </div>
          <div className='flex flex-col md:flex-row -mt-4 md:-mt-8'>
            <div className='w-full md:w-1/2 pl-0 md:pl-4'>
              <h3 className='font-fancy text-xl md:text-2xl ml-1'>
                Description:
              </h3>
              <div className='-ml-8'>
                <p className='text-base md:text-lg m-4 md:m-12 ml-4 w-full md:w-96 overflow-y-auto max-h-48 border border-gray-300 p-4 rounded-xl md:border-0 md:p-0 md:rounded-none'>
                  {item.body}
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}

export default SingleProduct;
