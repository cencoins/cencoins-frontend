import { useState } from "react";
import {
  AppBar,
  Collapse,
  useMediaQuery,
  useScrollTrigger,
  useTheme,
} from "@mui/material";
import Container from "@/components/Container/Container";
import NavigationBar from "./NavigationBar";
import MobileMenu from "./MobileMenu";
import navigationPages from "./navigationPages";

interface Props {
  colorInvert?: boolean;
  bgcolor?: string;
}

export const Navigation: React.FC<Props> = ({
  colorInvert = false,
  bgcolor = "transparent",
}) => {
  const theme = useTheme();
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const isMd = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true,
  });

  const handleMobileMenuClick = (): void => {
    setOpenMobileMenu(!openMobileMenu);
  };

  const open = isMd ? false : openMobileMenu;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 38,
  });

  return (
    <>
      <AppBar
        position={"sticky"}
        sx={{
          top: 0,
          backgroundColor: trigger ? theme.palette.background.paper : bgcolor,
        }}
        elevation={trigger ? 1 : 0}
      >
        <Container paddingY={1} maxWidth={1440}>
          <NavigationBar
            handleMobileMenuClick={handleMobileMenuClick}
            pages={navigationPages}
            colorInvert={trigger ? false : colorInvert}
          />
        </Container>
      </AppBar>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Container paddingY={0}>
          <MobileMenu pages={navigationPages}></MobileMenu>
        </Container>
      </Collapse>
    </>
  );
};
