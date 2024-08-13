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

export type OrderData = {
  productId: string;
  quantity: number;
  // Add other fields as necessary
};

export type OrderResponse = {
  orderId: string;
  status: string;
  // Add other fields as necessary
};

export type UserOrdersResponse = {
  orders: Array<{
    orderId: string;
    productId: string;
    quantity: number;
    status: string;
    totalPrice: number;
  }>;
};
