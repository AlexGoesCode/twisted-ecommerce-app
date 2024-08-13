import { useEffect, useState } from 'react';
import { fetchUserOrders } from '../api/orderService';
import { UserOrdersResponse } from '../types/Types';
import { useNavigate } from 'react-router-dom';

interface MyAccountProps {
  userId: string;
}

const MyAccount = ({ userId }: MyAccountProps) => {
  const [orders, setOrders] = useState<UserOrdersResponse['orders']>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getOrders = async () => {
      try {
        const userOrders = await fetchUserOrders(userId);
        console.log('Fetched Orders:', userOrders); // Debug log
        setOrders(userOrders.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    getOrders();
  }, [userId]);

  const handleBack = () => {
    navigate('/'); // Navigate back to the home page or any other appropriate page
  };

  return (
    <div className='container mx-auto p-20 w-3/5'>
      <div className='relative bg-white shadow-md rounded-2xl p-4'>
        <button
          className='absolute top-2 right-2 w-20 bg-orange-300 p-3 rounded-full'
          onClick={handleBack}
        >
          Back
        </button>
        <h1 className='text-3xl text-center font-bold mb-4'>My Orders</h1>
        <h2 className='text-xl font-semibold mb-2'>Order Summary</h2>
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.orderId} className='mb-4'>
              <div className='flex justify-between items-center mb-2'>
                <div>
                  <h3 className='text-lg'>Order ID: {order.orderId}</h3>
                  <p>Product ID: {order.productId}</p>
                  <p>Quantity: {order.quantity}</p>
                  <p>Status: {order.status}</p>
                </div>
                <div>
                  <p>Total Price: ${order.totalPrice.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>You have no orders.</p>
        )}
      </div>
    </div>
  );
};

export default MyAccount;
