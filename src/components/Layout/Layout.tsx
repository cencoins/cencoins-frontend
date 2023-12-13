import { PropsWithChildren } from "react";
import { Box, Divider } from "@mui/material";
import Paper from "@mui/material/Paper";
import { Navigation } from "@/components/Navigation/Navigation";
import dynamic from "next/dynamic";
import { useWebsocket } from "@/hooks/useWebsocket";
import { Footer } from "@/components/Footer/Footer";
import Container from "@/components/Container/Container";

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
  useWebsocket();

  return (
    <Paper elevation={0}>
      <Navigation />
      <Box component="main">
        {children}
        <Divider />
      </Box>
      <Container paddingY={4}>
        <Footer />
      </Container>
      <ModalSignIn />
      <ModalSignUp />
    </Paper>
  );
};
