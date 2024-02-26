import { useState } from "react";
import {
  AppBar,
  Box,
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

export const Navigation: React.FC<Props> = ({ colorInvert = false }) => {
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
          backgroundColor: theme.palette.background.paper,
        }}
        elevation={1}
      >
        <Container paddingY={1} maxWidth={1440}>
          <NavigationBar
            handleMobileMenuClick={handleMobileMenuClick}
            pages={navigationPages}
            colorInvert={trigger ? false : colorInvert}
          />
        </Container>
      </AppBar>
      <Box height={48}>
        <div
          id="cr-widget-marquee"
          data-coins="bitcoin,ethereum,tether,ripple,cardano"
          data-theme={theme.palette.mode}
          data-show-symbol="true"
          data-show-icon="true"
          data-show-period-change="true"
          data-period-change="24H"
          data-api-url="https://api.cryptorank.io/v0"
        >
          <a></a>
          <script src="https://cryptorank.io/widget/marquee.js" defer></script>
        </div>
      </Box>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <Container paddingY={0}>
          <MobileMenu pages={navigationPages}></MobileMenu>
        </Container>
      </Collapse>
    </>
  );
};
