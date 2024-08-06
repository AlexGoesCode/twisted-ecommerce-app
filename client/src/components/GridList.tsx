import { useAuth } from '../context/AuthContext';
import { Item } from '../types/Types';
import GridItem from './GridItem';

interface GridListProps {
  items: Item[];
  totalPages: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
  fetchData: () => Promise<void>;
}

export default function GridList({
  items,
  // totalPages,
  // currentPage,
  // handlePageChange,
  fetchData,
}: GridListProps) {
  const { user } = useAuth();

  console.log('Rendering GridList with items:', items); // Debug log
  console.log('Total items:', items.length); // Additional log for item count

  //* Previous version
  // return (
  //   <div className='bg-gray-100'>
  //     <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
  //       <h2 className='text-2xl font-bold tracking-tight text-mirage'>
  //         Our BobbleHeads selection:
  //       </h2>

  //       <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
  //         {items.map((item) => (
  //           <div key={item._id} className='group relative'>
  //             <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80'>
  //               <img
  //                 alt={item.imageAlt}
  //                 src={item.image}
  //                 className='h-full w-full object-cover object-center lg:h-full lg:w-full'
  //               />
  //             </div>
  //             <div className='mt-4 flex justify-between'>
  //               <div>
  //                 <h3 className='text-sm text-mirage'>
  //                   <a href={item.link}>
  //                     <span aria-hidden='true' className='absolute inset-0' />
  //                     {item.name}
  //                   </a>
  //                 </h3>
  //               </div>
  //               <p className='text-sm font-medium text-mirage'>{item.price}</p>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   </div>
  // );

  //* newer version
  return (
    <div className='bg-gray-100'>
      <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
        <h2 className='text-2xl font-bold tracking-tight text-mirage'>
          Our BobbleHeads selection:
        </h2>

        <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
          {items.map((item) => (
            <GridItem
              key={item._id}
              item={item}
              isLiked={user?.likedItems?.includes(item) || false}
              fetchData={fetchData}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
