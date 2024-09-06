import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { useShoppingCart } from '../hooks/useShoppingCart';
import { useNavigate } from 'react-router-dom';
import { placeOrder } from '../api/orderService';
import { OrderItem, OrderType } from '../types/Types'; // Import OrderData type
import OrderSuccessModal from '../components/OrderSuccessModal';

const Checkout = () => {
  const { user, token } = useAuth(); // Extract token from AuthContext
  const userShoppingCart = user?.shoppingCart;
  // const token = localStorage.getItem('token') || ''; // former token snippet
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [shippingAddress, setShippingAddress] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderData, setOrderData] = useState<OrderType>({} as OrderType);
  const navigate = useNavigate();
  const { cartItems, fetchCart, clearCart } = useShoppingCart(token || ''); // Pass token to useShoppingCart with a default value of an empty string

  useEffect(() => {
    if (token) {
      fetchCart();
    } else {
      console.error('Token is not available');
    }
  }, [fetchCart, token]);

  const handlePlaceOrder = async () => {
    if (!token) {
      alert('Token is not available. Please log in again.');
      return;
    }

    try {
      const orderItems: OrderItem[] = cartItems.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      }));

      const data = await placeOrder(
        orderItems,
        token,
        paymentMethod,
        totalPrice,
        shippingAddress
      );
      setOrderData(data);
      setIsModalOpen(true);
      clearCart();
      console.log('Order response:', data);
    } catch (error) {
      alert('Failed to place order');
      console.error('Error placing order:', error);
    }
  };

  const handleBack = () => {
    navigate('/cart');
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <div className='container mx-auto mt-20 p-4 md:p-10 w-full sm:w-4/5 md:w-4/5 lg:w-4/5 xl:w-3/5'>
      <div className='relative bg-white shadow-md rounded-2xl p-4 md:p-10'>
        <button
          className='absolute top-2 right-2 w-20 bg-orange-300 p-2 md:p-3 rounded-full'
          onClick={handleBack}
        >
          Back
        </button>
        <h1 className='text-2xl md:text-3xl text-center font-bold mb-4'>
          Checkout
        </h1>
        <div className='max-h-52 overflow-y-auto p-2 md:p-4'>
          <h2 className='text-lg md:text-xl font-semibold mb-2'>
            Order Summary
          </h2>
          {userShoppingCart ? (
            userShoppingCart.map((item) => {
              return (
                <div key={item.product._id}>
                  <div className='mb-4'>
                    <div className='flex justify-between items-center mb-2'>
                      <div>
                        <h3 className='text-md md:text-lg'>
                          {item.product.name}
                        </h3>
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
              );
            })
          ) : (
            <p>Your shopping cart is empty.</p>
          )}
        </div>
        <div className='text-right font-bold text-lg md:text-xl'>
          Total: €{totalPrice.toFixed(2)}
        </div>
        <h2 className='text-md md:text-lg font-semibold mb-2'>
          Shipping Address
        </h2>
        <input
          type='text'
          className='w-full p-2 border rounded mb-4'
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
          placeholder='Enter your shipping address'
        />
        <div className='mb-4'>
          <h2 className='text-md md:text-lg font-semibold mb-2'>
            Payment Method
          </h2>
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
          className='bg-blue-500 text-white px-4 py-2 rounded-xl mt-4 w-full'
        >
          Place Order
        </button>
      </div>
      <OrderSuccessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        orderData={orderData}
        totalPrice={totalPrice}
      />
    </div>
  );
};

export default Checkout;
