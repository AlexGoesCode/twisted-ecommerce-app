//* Attributes to add
// opt: comments, star ratings, chat, swift

import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import GridList from '../components/GridList';
import { Item } from '../types/Types';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState<'name' | 'country' | 'id'>('name');
  const [items, setItems] = useState<Item[]>([]);

  // Fetch data based on searchTerm, searchBy ( and later currentPage )
  const fetchData = async () => {
    console.log('%c fetching products', 'color: red');
    try {
      console.log('searchBy :>> ', searchBy);
      console.log('searchTerm', searchTerm);

      let url = 'http://localhost:5022/api/items/all';
      if (searchTerm) {
        url += `/productsby?${searchBy}=${searchTerm}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        console.log('error fetching products');
        return;
      }

      const data = await response.json();
      console.log('data:', data);
      setItems(data.allItems);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log('Items before passing to GridList:', items); // Debug log

  return (
    <div>
      <SearchBar
        handleSearch={handleSearch}
        setSearchTerm={setSearchTerm}
        setSearchBy={setSearchBy}
        searchBy={searchBy}
        className='relative mt-2 md:mt-16 border-8 border-gray-100 rounded-2xl'
      />
      <GridList items={items} fetchData={fetchData} />
    </div>
  );
};

export default Products;
