import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatData: "Mern",
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    activeUserInfo: (state, actions) => {
      state.chatData = actions.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { activeUserInfo } = chatSlice.actions;

export default chatSlice.reducer;
