/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  Drawer: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
};
export type SearchStackParamList = {
  Search: undefined;
  Product: {
    bagsId: number;
    bags: Array<any>;
  };
};

export type WishlistStackParamList = {
  Wishlist: undefined;
  Modal: undefined;
};

export type CheckoutStackParamList = {
  Checkout: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Search: undefined;
  Wishlist: undefined;
  Checkout: undefined;
};
