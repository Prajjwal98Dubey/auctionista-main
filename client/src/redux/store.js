import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slices/categorySlice";
import productReducer from "./slices/productSlice";
import userInfoReducer from "./slices/userInfoSlice";
import bidStatusReducer from "./slices/bidStatusSlice";
import productInfoReducer from "./slices/productInfoSlice";
const store = configureStore({
  reducer: {
    category: categoryReducer,
    products: productReducer,
    userInfo: userInfoReducer,
    bidStatus: bidStatusReducer,
    productInfo: productInfoReducer,
  },
});

export default store;
