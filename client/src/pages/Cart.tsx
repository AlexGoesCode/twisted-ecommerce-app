import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useShoppingCart } from '../hooks/useShoppingCart';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const { getUserProfile } = useAuth();
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

    if (cartItems.length === 1) {
      // Since the item is already deleted, check if the length was 1 before deletion
      navigate('/items');
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className='container mx-auto w-full sm:w-3/5 md:w-3/5 lg:w-3/5 xl:w-3/6'>
      <div className='bg-white shadow-lg rounded-2xl p-4 md:p-6 mt-24 sm:mt-44'>
        <h1 className='text-xl md:text-2xl text-center font-bold mb-4'>
          Shopping Cart
        </h1>
        {cartItems && cartItems.length === 0 ? (
          <p className='text-center'>Your shopping cart is empty.</p>
        ) : (
          <div className='max-h-72 overflow-y-auto p-2 md:p-4'>
            {cartItems &&
              cartItems.map((item) => (
                <div
                  key={item.product._id}
                  className='flex flex-col md:flex-row justify-between items-start md:items-center mb-4'
                >
                  <div className='mb-4 md:mb-0'>
                    <h2 className='text-lg md:text-xl font-semibold'>
                      {item.product.name}
                    </h2>
                    <p>Price: ${item.product.price.toFixed(2)}</p>
                    <p>Quantity: {item.quantity}</p>
                    <div className='flex items-center mt-2'>
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
            <div className='text-right font-bold text-lg md:text-xl'>
              {/* Total: ${totalPrice.toFixed(2)} */}
            </div>
          </div>
        )}
        <button
          onClick={handleCheckout}
          className='bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full md:w-auto'
        >
          Go to Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
