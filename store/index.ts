import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { Products } from "@/utils/products";

interface Basket {
  basket: Products[];
}

const initialState: Basket = {
  basket: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addItemToBasket: (state, action) => {
      const existingProduct = state.basket.find(
        (item) => item.id === action.payload.id
      );
      if (existingProduct) {
        existingProduct.quantity! += 1;
      } else {
        const newProduct = {
          ...action.payload,
          quantity: 1,
          dateOfСreation: new Date(),
        };
        state.basket.push(newProduct);
      }
    },
    removeItemFromBasket: (state, action) => {
      state.basket = state.basket.filter((item) => item.id !== action.payload);
    },
  },
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, productsSlice.reducer);

export const { addItemToBasket, removeItemFromBasket } = productsSlice.actions;

export default persistedReducer;
