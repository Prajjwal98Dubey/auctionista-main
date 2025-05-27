import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productDetails: {},
};

const newProductSlice = createSlice({
  name: "newProduct",
  initialState,
  reducers: {
    addNewProduct: (state, action) => {
      state.productDetails = { ...action.payload };
    },
  },
});

export const { addNewProduct } = newProductSlice.actions;
export default newProductSlice.reducer;
