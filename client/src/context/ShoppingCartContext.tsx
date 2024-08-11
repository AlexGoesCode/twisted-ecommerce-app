import { createContext, useContext } from 'react';
import { useShoppingCart as useShoppingCartHook } from '../hooks/useShoppingCart';

const ShoppingCartContext = createContext(null);

export const ShoppingCartProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const shoppingCart = useShoppingCartHook('argument');

  return (
    <ShoppingCartContext.Provider value={shoppingCart}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};
