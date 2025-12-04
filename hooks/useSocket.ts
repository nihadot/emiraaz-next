import { socketBaseUrl } from "@/api";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";


export function useSocket(userId: string) {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const s = io(socketBaseUrl);

    s.on("connect", () => {
      const token = null;

      let sessionId = sessionStorage.getItem("sessionId");
      if (!sessionId) {
        sessionId = crypto.randomUUID();
        sessionStorage.setItem("sessionId", sessionId);
      }

      s.emit("init", { token, sessionId });
    });

    setSocket(s);

    return () =>{
        s.off("connect");
        s.disconnect();
    }
  }, [userId]);

  return socket;
}
