import { configureStore } from '@reduxjs/toolkit'
import { ordersApi } from './orderApi'
import  orderReducer  from './orderSlice'


export const resetStore = () => configureStore({
  reducer: {

    orderState: orderReducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
  },
  middleware: getDefault => getDefault().concat(
    ordersApi.middleware,
    // if using RTK Query for your networking: add your middleware here
    // if using Redux Thunk for your networking: you can ignore this
  ),
})

export const store = resetStore()
