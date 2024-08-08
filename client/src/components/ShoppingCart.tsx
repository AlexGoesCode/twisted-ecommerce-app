import { useState } from 'react';

function ShoppingCart() {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Item 1', price: 10.0, quantity: 1 },
    { id: 2, name: 'Item 2', price: 15.0, quantity: 2 },
  ]);

  const handleCheckout = () => {
    // Implement checkout logic here
    alert('Proceeding to checkout');
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const increaseQuantity = (id: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className='container mx-auto p-4'>
      <div className='bg-white shadow-md rounded-lg p-4'>
        <h1 className='text-3xl text-center font-bold mb-4'>Basket</h1>
        {cartItems.length === 0 ? (
          <p>Your shopping cart is empty.</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className='flex justify-between items-center mb-4'
              >
                <div>
                  <h2 className='text-xl font-semibold'>{item.name}</h2>
                  <p>Price: ${item.price.toFixed(2)}</p>
                  <p>Quantity: {item.quantity}</p>
                  <div className='flex items-center'>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className='bg-green-500 text-white px-2 py-1 rounded mr-2'
                    >
                      +
                    </button>
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className='bg-yellow-500 text-white px-2 py-1 rounded'
                    >
                      -
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className='bg-red-500 text-white px-4 py-2 rounded'
                >
                  Remove
                </button>
              </div>
            ))}
            <div className='text-right font-bold text-xl'>
              Total: ${totalPrice.toFixed(2)}
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

export default ShoppingCart;
