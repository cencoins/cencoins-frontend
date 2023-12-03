import ServiceSocket from "@/service/ServiceSocket/ServiceSocket";
import { useEffect } from "react";
import getConfig from "next/config";
import { useSession } from "next-auth/react";

const {
  publicRuntimeConfig: { WEBSOCKET_URL },
} = getConfig();

export const useWebsocket = () => {
  const session = useSession();

  useEffect(() => {
    if (session.status === "authenticated") {
      if (!ServiceSocket.isConnected) {
        ServiceSocket.connect(WEBSOCKET_URL, session.data.accessToken);
      }
    }

    return () => {
      ServiceSocket.disconnect();
    };
  }, [session]);

  return null;
};
