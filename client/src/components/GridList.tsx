import { useAuth } from '../context/AuthContext';
import { Item } from '../types/Types';
import GridItem from './GridItem';

interface GridListProps {
  items: Item[];
  // totalPages: number;
  // currentPage: number;
  // handlePageChange: (page: number) => void;
  fetchData: () => Promise<void>;
}

export default function GridList({ items, fetchData }: GridListProps) {
  const { user } = useAuth();

  console.log('Rendering GridList with items:', items); // Debug log
  console.log('Total items:', items.length); // Additional log for item count

  return (
    <div className='bg-gray-100 opacity-100'>
      <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
        <h2 className='text-3xl text-center font-bold tracking-tight text-mirage'>
          Our BobbleHeads selection:
        </h2>

        <div className='mt-6 flex flex-wrap justify-center gap-x-6 gap-y-10 xl:gap-x-8'>
          {items.slice(0, 5).map((item) => (
            <div key={item._id} className='flex-shrink-0 w-1/5 p-2'>
              <GridItem
                item={item}
                isLiked={user?.shoppingCart?.includes(item) || false}
                fetchData={fetchData}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
