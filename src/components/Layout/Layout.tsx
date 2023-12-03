import { PropsWithChildren } from "react";
import { Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import { Navigation } from "@/components/Navigation/Navigation";
import dynamic from "next/dynamic";

const ModalSignIn = dynamic(
  () =>
    import("@/components/Modals/ModalSignIn/ModalSignIn").then(
      (module) => module.ModalSignIn,
    ),
  { ssr: false },
);

const ModalSignUp = dynamic(
  () =>
    import("@/components/Modals/ModalSignUp/ModalSignUp").then(
      (module) => module.ModalSignUp,
    ),
  { ssr: false },
);

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Paper elevation={0}>
      <Navigation />
      <Box component="main">{children}</Box>
      <ModalSignIn />
      <ModalSignUp />
    </Paper>
  );
};
