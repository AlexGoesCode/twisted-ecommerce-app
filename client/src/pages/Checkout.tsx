import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { useShoppingCart } from '../hooks/useShoppingCart';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { user } = useAuth();
  const userShoppingCart = user?.shoppingCart;
  const token = localStorage.getItem('token') || '';
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const navigate = useNavigate();
  const { cartItems, fetchCart } = useShoppingCart(token);

  console.log('userShoppingCart :>> ', userShoppingCart);

  useEffect(() => {
    if (token) {
      fetchCart();
    }
  }, [fetchCart, token]);

  const handlePlaceOrder = () => {
    // Implement the order placement logic here
    alert('Order placed successfully');
    // After placing the order, navigate to a success or order summary page
    navigate('/');
  };

  const handleBack = () => {
    navigate('/cart'); // Navigate back to the shopping cart page
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <div className='container mx-auto p-20 w-3/5'>
      <div className='relative bg-white shadow-md rounded-2xl p-4'>
        <button
          className='absolute top-2 right-2 w-20 bg-orange-300 p-3 rounded-full'
          onClick={handleBack}
        >
          Back
        </button>
        <h1 className='text-3xl text-center font-bold mb-4'>Checkout</h1>
        <h2 className='text-xl font-semibold mb-2'>Order Summary</h2>
        {userShoppingCart ? (
          userShoppingCart.map((item) => {
            return (
              <>
                <div>
                  <div className='mb-4'>
                    {/* <input
                type='text'
                className='w-full p-2 border rounded'
                placeholder='Enter your shipping address'
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
              /> */}
                  </div>

                  <div className='mb-4'>
                    <div
                      key={item.product._id}
                      className='flex justify-between items-center mb-2'
                    >
                      <div>
                        <h3 className='text-lg'>{item.product.name}</h3>
                        <p>
                          {item.quantity} x ${item.product.price.toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p>
                          ${(item.quantity * item.product.price).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })
        ) : (
          <p>Your shopping cart is empty.</p>
        )}
        <div className='text-right font-bold text-xl'>
          Total: ${totalPrice.toFixed(2)}
        </div>
        <h2 className='text-l font-semibold mb-2'>Shipping Address</h2>
        <div className='mb-4'>
          <h2 className='text-xl font-semibold mb-2'>Payment Method</h2>
          <select
            className='w-full p-2 border rounded'
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value='Credit Card'>Credit Card</option>
            <option value='PayPal'>PayPal</option>
            <option value='Bank Transfer'>Bank Transfer</option>
          </select>
        </div>
        <button
          onClick={handlePlaceOrder}
          className='bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full'
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
