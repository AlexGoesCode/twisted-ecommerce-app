import { useAuth } from '../context/AuthContext';
import { Item } from '../types/Types';
import GridItem from './GridItem';
import { useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

interface GridListProps {
  items: Item[];
  fetchData: () => Promise<void>;
}

export default function GridList({ items, fetchData }: GridListProps) {
  const { user } = useAuth();

  //* below - regular pagination setup
  // const [currentPage, setCurrentPage] = useState(0);

  // const itemsPerPage = 3;
  // const totalPages = Math.ceil(items.length / itemsPerPage);

  // const handleNextPage = () => {
  //   setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  // };

  // const handlePrevPage = () => {
  //   setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  // };

  // const currentItems = items.slice(
  //   currentPage * itemsPerPage,
  //   currentPage * itemsPerPage + itemsPerPage
  // );
  //* above - regular pagination setup

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <div className='flex items-start justify-center'>
      <div className='relative bg-gray-100 opacity-100 w-full min-h-80 rounded-2xl -mt-4'>
        <div className='mx-auto max-w-6xl pl-32 p-10'>
          <h2 className='text-2xl text-center p-8 font-bold tracking-tight text-mirage pr-24'>
            Our BobbleHeads selection:
          </h2>
          {/* <div className='mt-6 flex flex-wrap justify-center'> */}
          {/* {currentItems.map((item) => (
            <div key={item._id} className='flex-shrink-0 w-1/5 p-2'>
              <GridItem
                item={item}
                isLiked={user?.shoppingCart?.includes(item) || false}
                fetchData={fetchData}
              />
            </div>
          ))} */}
          {/* </div> */}
          {/* <button
          onClick={handlePrevPage}
          className='absolute left-32 top-1/2 transform -translate-y-1/2 text-mirage text-9xl font-normal focus:outline-none hover:text-gray-500'
          style={{ transform: 'scaleX(0.5) scaleY(3.0)' }}
        >
          {'<'}
        </button>
        <button
          onClick={handleNextPage}
          className='absolute right-32 top-1/2 transform -translate-y-1/2 text-mirage text-9xl font-normal focus:outline-none hover:text-gray-500'
          style={{ transform: 'scaleX(0.5) scaleY(3.0)' }}
        >
          {'>'}
        </button> */}

          <Carousel responsive={responsive}>
            {items.map((item) => (
              <div key={item._id}>
                <GridItem
                  item={item}
                  // isLiked={user?.shoppingCart?.includes(item) || false}
                  fetchData={fetchData}
                />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}
