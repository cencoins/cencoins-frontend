import { useSession } from "next-auth/react";
import { useEffect } from "react";

interface Props {
  // eslint-disable-next-line no-unused-vars
  setInterval: (interval: number) => void;
}

export const RefreshTokenHandler: React.FC<Props> = ({ setInterval }) => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      const timeRemaining = Math.round(
        (session.accessTokenExpiry - Date.now()) / 1000 / 60,
      );
      setInterval(timeRemaining > 30 ? timeRemaining - 30 : 0);
    }
  }, [session, setInterval]);

  return null;
};
