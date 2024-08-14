import { useState } from 'react';

interface PaginationProps {
  items: any[];
  itemsPerPage: number;
}

const Pagination = ({ items, itemsPerPage }: PaginationProps) => {
  const [startIndex, setStartIndex] = useState(0);
  const totalItems = items.length;

  const handlePrevious = () => {
    setStartIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems);
  };

  const handleNext = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % totalItems);
  };

  const visibleItems = [];
  for (let i = 0; i < itemsPerPage; i++) {
    visibleItems.push(items[(startIndex + i) % totalItems]);
  }

  return (
    <div className='flex justify-between items-center w-full'>
      <button
        onClick={handlePrevious}
        className='w-2/3 h-full bg-gray-200 border-none cursor-pointer text-2xl'
      >
        &lt;
      </button>
      <div className='flex flex-wrap overflow-hidden w-full'>
        {visibleItems.map((item, index) => (
          <div
            key={index}
            className='w-1/3 h-24 box-border border border-gray-300 m-1'
          >
            {item}
          </div>
        ))}
      </div>
      <button
        onClick={handleNext}
        className='w-2/3 h-full bg-gray-200 border-none cursor-pointer text-2xl'
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
