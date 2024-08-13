//* Attributes
// product name, images / image gallery, price, description,
// ... variants, stock availability, add to Cart, buy now,
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
      const response = await fetch(
        `http://localhost:5022/api/items/all/productsby?${searchBy}=${searchTerm}`
      );
      // in the link: for Pagiantion - add '&page=${currentPage}' before searchTerm
      // `http://localhost:5022/api/productsby${searchBy}?${searchBy}=${searchTerm}&number=10`
      // 'http://localhost:5022/api/items/all'

      if (!response.ok) {
        console.log('error fetching products');
        return;
      }
      if (response.ok) {
        const data = await response.json();
        console.log('data:', data);
        setItems(data.allItems);
      }

      // if (Array.isArray(data)) {
      //   setItems(data.allItems);
      // } else if (data && Array.isArray(data.allItems)) {
      //   setItems(data.allItems);
      // } else {
      //   console.warn('Unexpected data format:', data);
      //   setItems([]);
      // }
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    //  pagination logic here
  };

  // pagination logic here

  const handleSearch = () => {
    // setCurrentPage(1);
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
      />
      <GridList items={items} fetchData={fetchData} />
    </div>
  );
};

export default Products;
