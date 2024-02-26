import { PropsWithChildren } from "react";
import { Box, Divider } from "@mui/material";
import Paper from "@mui/material/Paper";
import { Navigation } from "@/components/Navigation/Navigation";
import { Footer } from "@/components/Footer/Footer";
import Container from "@/components/Container/Container";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
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
    </Paper>
  );
};
