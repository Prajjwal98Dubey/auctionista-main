import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appliedBids: [], // {productId,prevPrice}
};

const bidStatusSlice = createSlice({
  name: "Bid-Status",
  initialState,
  reducers: {
    addToBidCollection: (state, action) => {
      state.appliedBids.push(action.payload);
    },
    removeFromBidCollection: (state, action) => {
      state.appliedBids = state.appliedBids.filter(
        (obj) => obj.productId !== action.payload.productId
      );
    },
    updateBidOfProduct: (state, action) => {
      state.appliedBids = state.appliedBids.map((obj) => {
        if (obj.productId === action.payload.productId) {
          return { ...obj, prevPrice: action.payload.newPrice };
        }
        return { ...obj };
      });
    },
  },
});

export const {
  addToBidCollection,
  removeFromBidCollection,
  updateBidOfProduct,
} = bidStatusSlice.actions;
export default bidStatusSlice.reducer;
