import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    fullName: '',
    size: '',
    toppings: [],
    sizeFilter: '',
  },
  reducers: {
    sizeValue: (state, action) => {
      const { value } = action.payload;
      state.size = value;  
    },
    customer: (state, action) => {
      const { value } = action.payload
      state.fullName = value
    },
    changeToppings: (state, action) => {
      const { value } = action.payload;
      if (state.toppings.includes(value)) {
        state.toppings = state.toppings.filter(topping => topping !== value);
      } else {
        state.toppings = [...state.toppings, value]
      }
    },
    resetState(state) {
      state.fullName = '';
      state.size = '';
      state.toppings = [];  // Reset toppings
      state.sizeFilter = '';
    }
    

  },
});

export const { setFormValue, sizeValue, customer, changeToppings, resetState } = orderSlice.actions;

export default orderSlice.reducer;  
