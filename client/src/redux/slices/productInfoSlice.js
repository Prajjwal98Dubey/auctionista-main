import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productInitialDetails: {},
  productFeatureList: {},
  productBidInfo: {},
};

const productInfoSlice = createSlice({
  name: "productInfo",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.productInitialDetails[action.payload.productId] = {
        ...action.payload.productDetails,
      };
    },
    addProductFeature: (state, action) => {
      state.productFeatureList[action.payload.productId] = {
        ...action.payload.features,
      };
    },
    addProductsBidInfo: (state, action) => {
      state.productBidInfo[action.payload.productId] = {
        ...action.payload.bidInfo,
      };
    },
    updateProductBidInfo: (state, action) => {
      state.productBidInfo[action.payload.productId] = {
        bidCount: action.payload.isBidPlaced
          ? state.productBidInfo[action.payload.productId].bidCount + 1
          : state.productBidInfo[action.payload.productId].bidCount,
        maxPrice: Math.max(
          action.payload.userBidPrice,
          state.productBidInfo[action.payload.productId].maxPrice
        ),
      };
    },
    removeProductBidInfo: (state, action) => {
      state.productBidInfo[action.payload.productId] = {
        ...state.productBidInfo[action.payload.productId],
        bidCount: state.productBidInfo[action.payload.productId].bidCount - 1,
      };
    },
  },
});

export const {
  addProduct,
  addProductFeature,
  addProductsBidInfo,
  updateProductBidInfo,
  removeProductBidInfo,
} = productInfoSlice.actions;
export default productInfoSlice.reducer;
