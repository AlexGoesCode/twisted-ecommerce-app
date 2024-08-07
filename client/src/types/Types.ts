export type Item = {
  _id: string;
  name: string;
  price: number;
  inStock: number;
  country: string;
  body: 'I love it';
  likes?: string[];
  image: ImageType[];
  imageAlt: string;
  link: string;
};

export type ImageType = {
  alt: string;
  url: string;
  _id: string;
};

export type UserType = {
  email: string;
  username: string;
  likedItems: Item[];
  id: string;
  avatar: string;
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
