import { useNavigate } from 'react-router-dom'; //
import { OrderType } from '../types/Types';
// import { useShoppingCart } from '../hooks/useShoppingCart'; // new
// import { useContext } from 'react';                          // new
// import { AuthContext } from '../context/AuthContext';        // new

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderData: OrderType;
  totalPrice: number | undefined;
}

function OrderSuccessModal({
  isOpen,
  onClose,
  orderData,
}: OrderSuccessModalProps) {
  const navigate = useNavigate();
  // const { token } = useContext(AuthContext);
  // const { clearCart } = useShoppingCart(token);

  const handleClose = async () => {
    onClose();
    // await clearCart();
    navigate('/myaccount');
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center'>
      <div className='bg-white p-6 rounded-xl shadow-lg'>
        <h2 className='text-2xl font-bold mb-4 text-center'>
          Order Placed Successfully!
        </h2>
        <p className='font-semibold text-center'>
          Thank you for your order. Here is a summary of your purchase:
        </p>
        <ul className='my-4 max-h-52 overflow-y-auto p-4'>
          {orderData.items.map((item, index) => (
            <li key={index} className='mb-2'>
              {item.quantity} x {item.product.name} - $
              {item.product.price.toFixed(2)}
            </li>
          ))}
        </ul>
        <p className='font-semibold'>
          Total: €
          {orderData.totalPrice ? orderData.totalPrice.toFixed(2) : 'N/A'}
        </p>
        <p className='font-semibold'>
          Shipping Address: {orderData.shippingAddress}
        </p>
        <button
          onClick={handleClose}
          className='bg-blue-500 text-white px-4 py-2 rounded-xl mt-4 w-full'
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default OrderSuccessModal;
