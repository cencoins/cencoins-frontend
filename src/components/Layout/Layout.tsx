import { PropsWithChildren } from "react";
import { Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import { ModalSignIn } from "@/components/Modals/ModalSignIn/ModalSignIn";
import { ModalSignUp } from "@/components/Modals/ModalSignUp/ModalSignUp";
import { Navigation } from "@/components/Navigation/Navigation";

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
