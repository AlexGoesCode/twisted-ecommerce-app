export type Item = {
  _id: string;
  name: string;
  price: number;
  country: string;
  body: 'I love it';
  likes?: string[];
  image: ImageType[];
  imageAlt: string;
  quantity: number;
  // link?: string;
  // inStock: number;
};

export type ShoppingCartItem = {
  quantity: number;
  product: Item;
  _id: string;
};

export type ImageType = {
  alt: string;
  url: string;
  _id: string;
};

export type UserType = {
  email: string;
  username: string;
  shoppingCart: [ShoppingCartItem];
  id: string;
  avatar: string;
  // likedItems: Item[];
};

export type SingleItemOkResponse = {
  error: boolean;
  message: string;
  data: Item;
};

export type LoginAndRegisterResponse = {
  message: string;
  user: UserType;
  token?: string;
};
export type GetProfileOkResponse = {
  message: string;
  user: UserType;
};

//* Orders types

export type OrderItem = {
  product: string;
  quantity: number;
};

// export type OrderResponse = {
//   orderId: string;
//   status: string;
// };

export type OrderType = {
  _id: string;
  userId: string;
  items: [{ product: Item; quantity: number }];
  paymentMethod: string;
  totalPrice: number;
  status: string;
  shippingAddress: string;
  createdAt: string;
};
export type UserOrdersResponse = OrderType[];

// If I don't use populate on 'items' the product property would be a string (objectId)
