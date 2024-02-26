import ServiceSocket from "@/service/ServiceSocket/ServiceSocket";
import { useEffect } from "react";
import getConfig from "next/config";
import { useSession } from "next-auth/react";

const {
  publicRuntimeConfig: {  WEBSOCKET_PUBLIC_URL },
} = getConfig();

export const useWebsocket = () => {
  const session = useSession();

  useEffect(() => {
    if (session.status !== "loading" && !ServiceSocket.isConnected) {
      // if (session.status === "authenticated") {
      //   ServiceSocket.connect(WEBSOCKET_URL, session.data.accessToken);
      // } else if (session.status === "unauthenticated") {
        ServiceSocket.connect(WEBSOCKET_PUBLIC_URL);
      // }
    }

    return () => {
      ServiceSocket.disconnect();
    };
  }, [session]);

  return null;
};
