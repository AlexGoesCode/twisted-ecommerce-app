// import { useAuth } from '../context/AuthContext'; // for like logics
import { Item } from '../types/Types';
import GridItem from './GridItem';
// import { useState } from 'react'; // for custom pagination logics
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

interface GridListProps {
  items: Item[];
  fetchData: () => Promise<void>;
}

export default function GridList({ items, fetchData }: GridListProps) {
  // const { user } = useAuth(); // for like logics

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 640 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <div className='relative flex items-start justify-center -mt-8 -mr-36 sm:-mr-0'>
      <div className='relative bg-gray-100 opacity-95 w-full h-4/5 rounded-3xl mr-52 sm:mr-0'>
        <div className='mx-auto max-w-6xl pl-32 p-10'>
          <h2 className='hidden md:block text-2xl text-center p-8 font-bold tracking-tight text-mirage pr-24'>
            Our BobbleHeads selection:
          </h2>

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
