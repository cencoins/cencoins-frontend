import { Box } from "@mui/material";
import { Navigation } from "../Navigation/Navigation";
import { PropsWithChildren } from "react";
import { ModalSignIn } from "../Modals/ModalSignIn/ModalSignIn";
import { ModalSignUp } from "../Modals/ModalSignUp/ModalSignUp";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box component="main">
      <Navigation />
      <Box component="section" sx={{ p: 3 }}>
        {children}
      </Box>
      <ModalSignIn />
      <ModalSignUp />
    </Box>
  );
};
