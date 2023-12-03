import ServiceSocket from "@/service/ServiceSocket/ServiceSocket";
import { useEffect } from "react";
import getConfig from "next/config";

const {
  publicRuntimeConfig: { WEBSOCKET_URL },
} = getConfig();

export const useWebsocket = () => {
  useEffect(() => {
    if (!ServiceSocket.isConnected) {
      ServiceSocket.connect(WEBSOCKET_URL);
    }

    return () => {
      ServiceSocket.disconnect();
    };
  }, []);
  return null;
};
