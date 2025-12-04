import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
  },
  reducers: {
    open(state) {
      state.isOpen = true;
    },
    close(state) {
      state.isOpen = false;
      state.isMinimized = false;
    },
    minimize(state) {
      state.isMinimized = true;
      state.isOpen = false;
    },
    maximize(state) {
      state.isMaximized = true;
      state.isOpen = true;
      state.isMinimized = false;
    },
  },
});

export const { open, close, minimize, maximize } = chatSlice.actions;
export default chatSlice.reducer;
