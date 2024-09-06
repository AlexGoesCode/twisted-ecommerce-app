import { useState, useCallback } from 'react';
import { ShoppingCartItem } from '../types/Types';

export const useShoppingCart = (token: string) => {
  const [cartItems, setCartItems] = useState<ShoppingCartItem[]>([]);

  const fetchCart = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5022/api/items/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log('data :>> ', data);
      setCartItems(data.shoppingCart);
    } catch (error) {
      console.log('Error fetching cart:', error);
    }
  }, [token]);

  const clearCart = async () => {
    try {
      const response = await fetch(
        'http://localhost:5022/api/orders/clear-cart',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setCartItems([]);
        fetchCart();
      } else {
        console.log('Error clearing cart');
      }
    } catch (error) {
      console.log('Error clearing cart:', error);
    }
  };

  //* Add Item to Cart
  const addItemsToCart = async (productId: string) => {
    console.log('productId :>> ', productId);
    try {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
      myHeaders.append('Authorization', `Bearer ${token}`);

      const urlencoded = new URLSearchParams();
      urlencoded.append('productId', productId);

      const requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: urlencoded,
      };

      const response = await fetch(
        'http://localhost:5022/api/items/addItemsToCart',
        requestOptions
      );

      if (response.ok) {
        const data = await response.json();
        console.log('data :>> ', data);
        // setCartItems(data.userIncreasingCart.shoppingCart);
        fetchCart();
      }
    } catch (error) {
      console.log('Error adding item to cart:', error);
    }
  };

  //* Remove Item from Cart
  const removeItemsFromCart = async (productId: string) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
      myHeaders.append('Authorization', `Bearer ${token}`);

      const urlencoded = new URLSearchParams();
      urlencoded.append('productId', productId);

      const requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: urlencoded,
      };

      const response = await fetch(
        'http://localhost:5022/api/items/removeItemsFromCart',
        requestOptions
      );

      if (response.ok) {
        await response.json();
        fetchCart();
      }
    } catch (error) {
      console.log('Error removing item from cart', error);
    }
  };

  const deleteItemsFromCart = async (productId: string) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
      myHeaders.append('Authorization', `Bearer ${token}`);

      const urlencoded = new URLSearchParams();
      urlencoded.append('productId', productId);

      const requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: urlencoded,
      };

      const response = await fetch(
        'http://localhost:5022/api/items/deleteItemsFromCart',
        requestOptions
      );

      if (response.ok) {
        const data = await response.json();
        console.log('data :>> ', data);
        fetchCart();
      }
    } catch (error) {
      console.log('Error deleting items from cart', error);
    }
  };

  return {
    cartItems,
    fetchCart,
    clearCart,
    addItemsToCart,
    removeItemsFromCart,
    deleteItemsFromCart,
  };
};
