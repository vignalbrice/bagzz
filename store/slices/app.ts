import { createSlice, StateFromReducersMapObject } from "@reduxjs/toolkit";

interface InitialStateProps {
  modalVisible: boolean;
  modalCheckout: boolean;
  carousel: Array<any>;
  categories: Array<any>;
  bags: Array<any>;
  description: Object;
  shipmentInfo: Object;
  paymentOptions: Object;
  checkout: Array<any>;
  favorites: Array<any>;
}

const initialState: InitialStateProps = {
  modalVisible: false,
  modalCheckout: false,
  carousel: [
    {
      key: 1,
      path: require("../../assets/images/bagOne.png"),
    },
    {
      key: 2,
      path: require("../../assets/images/bagTwo.png"),
    },
  ],
  categories: [
    {
      key: 1,
      title: "Handle bags",
      image: require("../../assets/images/shop1.png"),
    },
    {
      key: 2,
      title: "Crossbody bags",
      image: require("../../assets/images/shop2.png"),
    },
    {
      key: 3,
      title: "Shoulder bags",
      image: require("../../assets/images/shop3.png"),
    },
    {
      key: 4,
      title: "Tote bag",
      image: require("../../assets/images/shop4.png"),
    },
  ],
  bags: [
    {
      key: 1,
      title: "Artsy",
      subtitle: "Wallet with chain",
      referenceNumber: "Style #36252 0YK0G 1000",
      nbItems: 1,
      price: 564,
      shopNow: "Shop Now",
      buyNow: "Buy Now",
      image: require("../../assets/images/artsy.png"),
    },
    {
      key: 2,
      title: "Berkely",
      subtitle: "Wallet with chain",
      referenceNumber: "Style #36252 0YK0G 1000",
      nbItems: 1,
      price: 620,
      shopNow: "Shop Now",
      buyNow: "Buy Now",
      image: require("../../assets/images/berkely.png"),
    },
    {
      key: 3,
      title: "Capucinus",
      subtitle: "Wallet with chain",
      referenceNumber: "Style #36252 0YK0G 1000",
      nbItems: 1,
      price: 735,
      shopNow: "Shop Now",
      buyNow: "Buy Now",
      image: require("../../assets/images/capucinus.png"),
    },
    {
      key: 4,
      title: "Monogram",
      subtitle: "Wallet with chain",
      referenceNumber: "Style #36252 0YK0G 1000",
      nbItems: 1,
      price: 425,
      shopNow: "Shop Now",
      buyNow: "Buy Now",
      image: require("../../assets/images/monogram.png"),
    },
  ],
  description: {
    detail:
      "As in handbags, the double ring and bar design defines the wallet shape, highlighting the front flap closure which is tucked inside the hardware. Completed with an organizational interior, the black leather wallet features a detachable chain.",
    materialCare:
      "All products are made with carefully selected materials. Please handle with care for longer product life.",
    materialList: [
      "- Protect from direct light, heat and rain. Should it become wet, dry it immediately with a soft cloth",
      "- Store in the provided flannel bag or box",
      "- Clean with a soft, dry cloth",
    ],
  },
  shipmentInfo: {
    description:
      "Pre-order, Made to Order and DIY items will ship on the estimated date noted on the product description page. These items will ship through Premium Express once they become available.",
    returnPolicy:
      "Returns may be made by mail or in store. The return window for online purchases is 30 days (10 days in the case of beauty items) from the date of delivery. You may return products by mail using the complimentary prepaid return label included with your order, and following the return instructions provided in your digital invoice.",
  },
  paymentOptions: {
    title: "We accepts the following forms of payment for online purchases:",
    subtitle:
      "PayPal may not be used to purchase Made to Order Décor or DIY items.",
    description:
      "The full transaction value will be charged to your credit card after we have verified your card details, received credit authorisation, confirmed availability and prepared your order for shipping. For Made To Order, DIY, personalised and selected Décor products, payment will be taken at the time the order is placed.",
  },
  checkout: [],
  favorites: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setModalVisible: (state, action) => {
      state.modalVisible = action.payload;
    },
    setCheckoutModal: (state, action) => {
      state.modalCheckout = action.payload;
    },
    setCheckoutItem: (state, action) => {
      const checkoutIndex = state.checkout.findIndex(
        (item: { key: number }) => item.key === action.payload.key
      );
      if (checkoutIndex >= 0) {
        /* state.checkout = state.checkout.filter(
          (item: { key: number; nbItems: number }) => {
            if (item.key === action.payload.key) {
              item.nbItems = ++item.nbItems;
              return item;
            }
          }
        ); */
        return;
      } else {
        state.checkout = [...state.checkout, action.payload];
      }
    },
    setFavoriteItem: (state, action) => {
      const favoriteIndex = state.favorites.findIndex(
        (item: { key: number }) => item.key === action.payload.key
      );
      if (favoriteIndex >= 0) {
        state.favorites = state.favorites.filter(
          (item: { key: number }) => item.key !== action.payload.key
        );
      } else {
        state.favorites = [...state.favorites, action.payload];
      }
    },
    addItem: (state, action) => {
      state.checkout = state.checkout.filter(
        (item: { key: number; nbItems: number; price: number }) => {
          if (item.key === action.payload) {
            item.nbItems = ++item.nbItems;
            item.price = item.price * item.nbItems;
            return item;
          } else {
            return item;
          }
        }
      );
    },
    removeItem: (state, action) => {
      const checkoutItem = state.checkout.find(
        (item: { key: number }) => item.key === action.payload
      );
      if (checkoutItem.nbItems > 1) {
        state.checkout = state.checkout.filter(
          (item: { key: number; nbItems: number; price: number }) => {
            if (item.key === action.payload) {
              item.price = item.price / item.nbItems;
              item.nbItems = --item.nbItems;
              return item;
            } else {
              return item;
            }
          }
        );
      }
    },
  },
});

export const {
  setModalVisible,
  setCheckoutModal,
  setCheckoutItem,
  setFavoriteItem,
  addItem,
  removeItem,
} = appSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const modalSelector = (state: any) => state.app.modalVisible;
export const favoritesSelector = (state: any) => state.app.favorites;
export const checkoutSelector = (state: any) => state.app.checkout;
export const bagsSelector = (state: any) => state.app.bags;
export const carouselSelector = (state: any) => state.app.carousel;
export const categoriesSelector = (state: any) => state.app.categories;
export const checkoutModalSelector = (state: any) => state.app.modalCheckout;
export default appSlice.reducer;
