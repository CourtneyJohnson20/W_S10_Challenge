import { configureStore } from '@reduxjs/toolkit';
import { ordersApi } from './orderApi';
import orderReducer from './orderSlice';

// Create a store instance
export const resetStore = () => configureStore({
  reducer: {
    orderState: orderReducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(
    ordersApi.middleware,
    // Add middleware if needed
  ),
});

// Export the store (used in your app or tests)
export const store = resetStore();

// If necessary, reset the store after each test to ensure clean state
export const resetTestStore = () => {
  return resetStore();
};
