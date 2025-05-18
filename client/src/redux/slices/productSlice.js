/***
 *
 * THIS SLICE IS NOT IN USE IN ANY OF THE CLIENT COMPONENT.(DON'T RELY ON THIS)
 *
 *
 */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: {}, // products = {"mobile":[{},{}]}
};

const productSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {
    getProductList(state, action) {
      if (!state.items[action.payload.category.toLowerCase()]) {
        state.items[action.payload.category.toLowerCase()] = [
          ...action.payload.items,
        ];
      }
    },
  },
});

export const { getProductList } = productSlice.actions;
export default productSlice.reducer;
