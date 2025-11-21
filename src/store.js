import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer, // manages the cart slice of the state
  },
});

export default store;
