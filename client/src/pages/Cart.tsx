import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useShoppingCart } from '../hooks/useShoppingCart';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const { user, getUserProfile } = useAuth();
  const token = localStorage.getItem('token') || '';
  const {
    cartItems,
    fetchCart,
    addItemsToCart,
    removeItemsFromCart,
    deleteItemsFromCart,
  } = useShoppingCart(token);
  const navigate = useNavigate();

  console.log('cartItems :>> ', cartItems);
  useEffect(() => {
    if (token) {
      fetchCart();
    }
  }, [fetchCart, token]);

  const increaseQuantity = (productId: string) => {
    addItemsToCart(productId);
  };

  const decreaseQuantity = (productId: string) => {
    removeItemsFromCart(productId);
  };

  const deleteItem = async (productId: string) => {
    await deleteItemsFromCart(productId);
    await fetchCart();
    getUserProfile();
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className='container mx-auto p-20 w-3/5'>
      <div className='bg-white shadow-lg rounded-2xl p-10 mt-4'>
        <h1 className='text-2xl text-center font-bold mb-4'>Shopping Cart</h1>
        {cartItems && cartItems.length === 0 ? (
          <p>Your shopping cart is empty.</p>
        ) : (
          <div className='max-h-96 overflow-y-auto p-4'>
            {cartItems &&
              cartItems.map((item) => (
                <div
                  key={item.product._id}
                  className='flex justify-between items-center mb-4'
                >
                  <div>
                    <h2 className='text-xl font-semibold'>
                      {item.product.name}
                    </h2>
                    <p>Price: ${item.product.price.toFixed(2)}</p>
                    <p>Quantity: {item.quantity}</p>
                    <div className='flex items-center'>
                      <button
                        onClick={() => increaseQuantity(item.product._id)}
                        className='bg-green-500 text-white px-2 py-1 rounded mr-2'
                      >
                        +
                      </button>
                      <button
                        onClick={() => decreaseQuantity(item.product._id)}
                        className='bg-yellow-500 text-white px-2 py-1 rounded'
                      >
                        -
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteItem(item.product._id)}
                    className='bg-red-500 text-white px-4 py-2 rounded'
                  >
                    Remove
                  </button>
                </div>
              ))}
            <div className='text-right font-bold text-xl'>
              {/* Total: ${totalPrice.toFixed(2)} */}
            </div>
            <button
              onClick={handleCheckout}
              className='bg-blue-500 text-white px-4 py-2 rounded mt-4'
            >
              Go to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
