// socket.ts
import { io, Socket } from "socket.io-client";
import { socketBaseUrl } from "@/api";

let socket: Socket | null = null;

export const getSocket = () => {
  if (socket) return socket;

  socket = io(socketBaseUrl, { transports: ["websocket"] });

  socket.on("connect", () => {
    let sessionId = sessionStorage.getItem("sessionId");
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      sessionStorage.setItem("sessionId", sessionId);
    }
    socket?.emit("init", { token: null, sessionId });
  });

  return socket;
};

export const disconnectSocket = () => {
  socket?.disconnect();
  socket = null;
};
