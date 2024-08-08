import { createContext, useState, ReactNode } from 'react';
import { Item } from '../types/Types';

interface BasketContextType {
  basket: Item[];
  addToBasket: (item: Item) => void;
}

export const BasketContext = createContext<BasketContextType | undefined>(
  undefined
);

export const BasketProvider = ({ children }: { children: ReactNode }) => {
  const [basket, setBasket] = useState<Item[]>([]);

  const addToBasket = (item: Item) => {
    setBasket((prevBasket) => [...prevBasket, item]);
  };

  return (
    <BasketContext.Provider value={{ basket, addToBasket }}>
      {children}
    </BasketContext.Provider>
  );
};
