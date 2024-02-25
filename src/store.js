import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./slice/counterSlice";
import chatSlice from "./slice/chatSlice";

export const store = configureStore({
  reducer: {
    userLoginInfo: counterSlice,
    activeUserMsg: chatSlice,
  },
});
