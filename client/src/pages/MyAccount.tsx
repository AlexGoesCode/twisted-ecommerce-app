import { useEffect, useState } from 'react';
import { fetchUserOrders } from '../api/orderService';
import { UserOrdersResponse } from '../types/Types';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const MyAccount = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<UserOrdersResponse>([]);
  const [toggledOrderId, setToggledOrderId] = useState<string | null>(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token') || '';

  useEffect(() => {
    const getUserOrders = async () => {
      if (!user) {
        alert('you need to login first');
        return;
      }
      if (user) {
        try {
          const userOrders = await fetchUserOrders(user.id, token);
          console.log('Fetched Orders:', userOrders); // Debug log
          return setOrders(userOrders);
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      }
    };

    getUserOrders();
  }, [user?.id, token]);

  const handleToggle = (orderId: string) => {
    setToggledOrderId(toggledOrderId === orderId ? null : orderId);
  };

  const handleBack = () => {
    navigate('/'); // Navigate back to the home page or any other appropriate page
  };

  return (
    <div className='container mx-auto p-20 w-3/5 h-full -mt-5'>
      <div className='relative bg-white shadow-lg rounded-2xl p-10 mt-20 overflow-hidden'>
        <button
          className='absolute top-2 right-2 w-20 bg-orange-300 p-3 rounded-full'
          onClick={handleBack}
        >
          Back
        </button>
        <h1 className='text-2xl text-center font-bold mb-4'>My Account</h1>
        <h2 className='text-xl font-semibold mb-2'>Orders History:</h2>
        <div className='max-h-52 overflow-y-auto p-4'>
          {orders && orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order._id}
                className='border border-gray-300 rounded-lg p-4 mb-4 bg-gray-50'
              >
                <div className='flex justify-between items-center mb-2'>
                  <div>
                    <h3 className='text-lg font-medium'>
                      Order ID: {order._id}
                    </h3>
                    <p className='text-sm'>
                      Date: {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                    <p className='text-sm'>
                      Total Price: $
                      {order.items
                        .reduce(
                          (total, item) =>
                            total + item.product.price * item.quantity,
                          0
                        )
                        .toFixed(2)}
                    </p>
                  </div>
                  <button
                    className='text-blue-500 underline'
                    onClick={() => handleToggle(order._id)}
                  >
                    {toggledOrderId === order._id
                      ? 'Hide Details'
                      : 'Show Details'}
                  </button>
                </div>
                {toggledOrderId === order._id && (
                  <div>
                    {order.items && order.items.length > 0 ? (
                      <>
                        {order.items.map((item, index) => (
                          <div
                            key={index}
                            className='border-t border-gray-200 pt-2 mt-2'
                          >
                            {/* <p className='text-sm'>
                              Product ID: {item.product._id}
                            </p> */}
                            <p className='text-sm'>
                              Product: {item.product.name}
                            </p>
                            <p className='text-sm'>Quantity: {item.quantity}</p>
                            <p className='text-sm'>
                              Price: $
                              {item.product.price
                                ? item.product.price.toFixed(2)
                                : 'N/A'}
                            </p>
                          </div>
                        ))}
                      </>
                    ) : (
                      <p className='text-sm'>No items in this order.</p>
                    )}
                    <div className='border-t border-gray-200 pt-2 mt-2'>
                      <p className='text-sm font-semibold'>
                        Status: {order.status}
                      </p>
                      <p className='text-sm font-semibold'>
                        Shipping Address: {order.shippingAddress}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className='text-center'>You have no orders.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
