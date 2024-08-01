export type Item = {
  _id: string;
  name: string; // always available, no need to make it optional
  country: string;
  description: string[];
  likes: string[];
  picture: string;
};

export type UserType = {
  email: string;
  username: string;
  likedItems: Item[];
  id: string;
  avatar: string;
};

export type SingleRecipeOkResponse = {
  error: boolean;
  message: string;
  data: Item;
};

export type LoginAndSignUpResponse = {
  message: string;
  user: UserType;
  token?: string;
};
export type GetProfileOkResponse = {
  message: string;
  user: UserType;
};
