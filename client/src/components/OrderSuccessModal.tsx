import { OrderType } from '../types/Types'; // Import OrderData type

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderData: OrderType;
  totalPrice: number | undefined;
}

const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  isOpen,
  onClose,
  orderData,
}) => {
  console.log('orderData modal :>> ', orderData);
  if (!isOpen) return null;
  console.log('orderData :>> ', orderData);
  return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center'>
      <div className='bg-white p-6 rounded-xl shadow-lg'>
        <h2 className='text-2xl font-bold mb-4 text-center'>
          Order Placed Successfully!
        </h2>
        <p className='font-bold'>
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
        <p className='font-bold'>Total: ${orderData.totalPrice.toFixed(2)}</p>
        <p className='font-bold'>
          Shipping Adress: ${orderData.shippingAddress}
        </p>
        <button
          onClick={onClose}
          className='bg-blue-500 text-white px-4 py-2 rounded-xl mt-4 w-full'
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default OrderSuccessModal;
