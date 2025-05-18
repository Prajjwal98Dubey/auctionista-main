import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails: {
    userName: "",
    userEmail: "",
    userPhoto: "",
  },
};

const userInfoSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    saveUserDetails(state, action) {
      const { user_name, user_email, user_photo } = action.payload;
      state.userDetails = {
        userName: user_name,
        userEmail: user_email,
        userPhoto: user_photo,
      };
    },
  },
});

export const { saveUserDetails } = userInfoSlice.actions;
export default userInfoSlice.reducer;
