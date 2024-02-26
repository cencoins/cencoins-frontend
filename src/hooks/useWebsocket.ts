import ServiceSocket from "@/service/ServiceSocket/ServiceSocket";
import { useEffect } from "react";
import getConfig from "next/config";
import { useSession } from "next-auth/react";

const {
  publicRuntimeConfig: { WEBSOCKET_PUBLIC_URL },
} = getConfig();

export const useWebsocket = ({ events }: { events: Record<string, any> }) => {
  const session = useSession();

  useEffect(() => {
    if (session.status !== "loading" && !ServiceSocket.isConnected) {
      // if (session.status === "authenticated") {
      //   ServiceSocket.connect(WEBSOCKET_URL, session.data.accessToken);
      // } else if (session.status === "unauthenticated") {
      ServiceSocket.connect({
        url: WEBSOCKET_PUBLIC_URL,
        events,
      });
      // }
    }

    return () => {
      ServiceSocket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return ServiceSocket;
};
