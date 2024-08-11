import { useState, useCallback } from 'react';

export const useShoppingCart = (token: string) => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = useCallback(async () => {
    try {
      const response = await fetch('/api/items/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setCartItems(data.user.shoppingCart);
    } catch (error) {
      console.log('Error fetching cart:', error);
    }
  }, [token]);

  const addItemToCart = async (productId: string) => {
    try {
      const response = await fetch('/api/items/addItemsToCart', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      if (response.ok) {
        const data = await response.json();
        setCartItems(data.user.shoppingCart);
      }
    } catch (error) {
      console.log('Error adding item to cart:', error);
    }
  };

  const removeItemFromCart = async (productId: string) => {
    try {
      const response = await fetch('/api/items/removeItemsFromCart', {
        method: 'PATCH',
        headers: {
          'Consent-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      if (response.ok) {
        const data = await response.json();
        setCartItems(data.user.shoppingCart);
      }
    } catch (error) {
      console.log('Error removing item from cart', error);
    }
  };

  return {
    cartItems,
    fetchCart,
    addItemToCart,
    removeItemFromCart,
  };
};
