// orderService.ts
import { OrderData, OrderResponse, UserOrdersResponse } from '../types/Types';

export const placeOrder = async (
  orderData: OrderData
): Promise<OrderResponse> => {
  try {
    const response = await fetch(
      'http://localhost:5173/api/orders/place-order',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      }
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data: OrderResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error placing order:', error);
    throw error;
  }
};

export const fetchUserOrders = async (
  userId: string
): Promise<UserOrdersResponse> => {
  try {
    const response = await fetch(
      `http://localhost:5173/api/orders/user-orders/${userId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data: UserOrdersResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user orders:', error);
    throw error;
  }
};
