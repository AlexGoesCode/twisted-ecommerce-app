import { useAuth } from '../context/AuthContext';

const Checkout = () => {
  const { user } = useAuth();
  const userShoppingCart = user?.shoppingCart;
  console.log('userShoppingCart :>> ', userShoppingCart);
  return (
    <div>
      <h1>New Page</h1>
      {userShoppingCart &&
        userShoppingCart.map((item) => {
          return (
            <p>
              {item.product.name} : {item.product.price}
            </p>
          );
        })}
    </div>
  );
};

export default Checkout;
