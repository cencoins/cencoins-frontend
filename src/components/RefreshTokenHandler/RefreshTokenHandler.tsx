import { ServiceBase } from "@/service/ServiceBase";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

interface Props {
  // eslint-disable-next-line no-unused-vars
  setInterval: (interval: number) => void;
}

export const RefreshTokenHandler: React.FC<Props> = ({ setInterval }) => {
  const session = useSession();

  useEffect(() => {
    if (session.status === "authenticated") {
      ServiceBase.setAuthToken(session.data.accessToken);
    } else if (session.status === "unauthenticated") {
      ServiceBase.setAuthToken(null);
    }
  }, [session]);

  useEffect(() => {
    if (session.data) {
      const timeRemaining = Math.round(
        (session.data.accessTokenExpiry - Date.now()) / 1000 / 60,
      );
      setInterval(timeRemaining > 30 ? timeRemaining - 30 : 0);
    }
  }, [session, setInterval]);

  return null;
};
