import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef } from "react";
import { Button, Grid, alpha, useTheme } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import ThemeModeToggler from "../ThemeModeToggler/ThemeModeToggler";
import { LANGUAGES } from "@/constants/LANGUAGES";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

export interface NavItemProps {
  title: string;
  id: string;
  href: string;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="right" ref={ref} {...props} />;
});

interface Props {
  open: boolean;
  handleClose?: () => void;
  pages: Array<{
    title: string;
    id: string;
    href?: string;
    children?: Array<NavItemProps>;
  }>;
}

export const MobileMenuSlide: React.FC<Props> = ({
  open,
  handleClose,
  pages,
}) => {
  const theme = useTheme();
  const { mode } = theme.palette;
  const router = useRouter();
  const { t, i18n } = useTranslation("common");
  const changeTo = router.locale === LANGUAGES.RU ? LANGUAGES.EN : LANGUAGES.RU;

  const onToggleLanguageClick = (newLocale: string) => {
    const { pathname, asPath, query } = router;
    i18n.changeLanguage(newLocale);
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar
        sx={{
          position: "relative",
          height: 58,
          py: 1,
          px: 2,
        }}
      >
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Link href="/">
              <Image
                alt="Cencoins logo"
                width={101}
                height={16}
                src={
                  mode !== "light" ? "/images/logo-b.svg" : "/images/logo-w.svg"
                }
              />
            </Link>
          </Grid>
          <Grid item>
            <Grid container spacing={2}>
              <Grid item>
                <Grid item>
                  <Button
                    variant="outlined"
                    style={{ cursor: "pointer" }}
                    color={mode === "light" ? "inherit" : "primary"}
                    onClick={() => onToggleLanguageClick(changeTo)}
                    sx={{
                      borderRadius: 2,
                      minWidth: "auto",
                      padding: 1,
                      height: 42,
                      width: 42,
                      borderColor: alpha(
                        mode === "light"
                          ? theme.palette.grey.A100
                          : theme.palette.divider,
                        0.2,
                      ),
                    }}
                  >
                    {(changeTo !== LANGUAGES.EN
                      ? LANGUAGES.EN
                      : LANGUAGES.RU
                    ).toLocaleUpperCase()}
                  </Button>
                </Grid>
              </Grid>
              <Grid item>
                <ThemeModeToggler isMobile />
              </Grid>
              <Grid item>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleClose}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </AppBar>
      <List>
        {pages.map((page) => (
          <>
            <Link href={page.href ?? ""}>
              <ListItemButton onClick={handleClose}>
                <ListItemText primary={t(page.title)} />
              </ListItemButton>
            </Link>
            <Divider />
          </>
        ))}
      </List>
    </Dialog>
  );
};
