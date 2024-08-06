export type Item = {
  _id: string;
  name: string; // always available, no need to make it optional
  price: string;
  country: string;
  body: 'I love it';
  likes: string[];
  image: string;
  imageAlt: string;
  link: string;
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
