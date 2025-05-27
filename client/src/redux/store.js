import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slices/categorySlice";
import productReducer from "./slices/productSlice";
import userInfoReducer from "./slices/userInfoSlice";
import bidStatusReducer from "./slices/bidStatusSlice";
import productInfoReducer from "./slices/productInfoSlice";
import newProductReducer from "./slices/newProductSlice";
const store = configureStore({
  reducer: {
    category: categoryReducer,
    products: productReducer,
    userInfo: userInfoReducer,
    bidStatus: bidStatusReducer,
    productInfo: productInfoReducer,
    newProduct: newProductReducer,
  },
});

export default store;
