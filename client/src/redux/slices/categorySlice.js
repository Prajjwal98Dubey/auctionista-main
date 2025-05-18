import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selected: "All",
};

const categorySlice = createSlice({
  name: "Category",
  initialState,
  reducers: {
    updateSelectedCategory: (state, action) => {
      state.selected = action.payload.currCategory;
    },
  },
});

export const { updateSelectedCategory } = categorySlice.actions;

export default categorySlice.reducer;
