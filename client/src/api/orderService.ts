// orderService.ts
import { OrderItem, OrderType, UserOrdersResponse } from '../types/Types';

export const placeOrder = async (
  orderItems: OrderItem[],
  token: string,
  paymentMethod: string,
  totalPrice: number,
  shippingAddress: string
): Promise<OrderType> => {
  try {
    const response = await fetch(
      'http://localhost:5022/api/orders/place-order',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: orderItems,
          shippingAddress: shippingAddress,
          paymentMethod: paymentMethod,
          totalPrice: totalPrice,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text(); // Capture the response body
      console.error('Error response:', errorText);
      throw new Error('Network response was not ok');
    }

    const data: OrderType = await response.json();
    console.log('data for orderResponse :>> ', data);
    return data;
  } catch (error) {
    console.error('Error placing order:', error);
    throw error;
  }
};

export const fetchUserOrders = async (
  userId: string,
  token: string
): Promise<UserOrdersResponse> => {
  try {
    const response = await fetch(
      `http://localhost:5022/api/orders/user-orders/${userId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text(); // Capture the response body
      console.error('Error response:', errorText);
      throw new Error('Network response was not ok');
    }

    const data: UserOrdersResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user orders:', error);
    throw error;
  }
};
