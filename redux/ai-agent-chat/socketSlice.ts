// socketSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { io, Socket } from "socket.io-client";
import { socketBaseUrl } from "@/api";

export const initSocket = createAsyncThunk(
  "socket/init",
  async () => {
    const s: Socket = io(socketBaseUrl, { transports: ["websocket"] });

    await new Promise<void>((resolve) => {
      s.on("connect", () => {
        let sessionId = sessionStorage.getItem("sessionId");
        if (!sessionId) {
          sessionId = crypto.randomUUID();
          sessionStorage.setItem("sessionId", sessionId);
        }
        s.emit("init", { token: null, sessionId });
        resolve();
      });
    });

    return s;
  },
  {
    condition: (_, { getState }: any) => {
      const { socket } = getState().socket;
      if (socket) return false;
    },
  }
);

const socketSlice = createSlice({
  name: "socket",
  initialState: {
    socket: null as any
  },
  reducers: {
    disconnectSocket: (state) => {
      state.socket?.disconnect();
      state.socket = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initSocket.fulfilled, (state, action) => {
      state.socket = action.payload;
    });
  },
});

export const { disconnectSocket } = socketSlice.actions;
export default socketSlice.reducer;
