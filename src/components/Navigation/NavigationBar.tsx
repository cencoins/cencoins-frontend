import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { alpha, useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import NavItem from "./NavigationItem";
import {
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Link as MuiLink,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import ThemeModeToggler from "../ThemeModeToggler/ThemeModeToggler";
import { useTranslation } from "next-i18next";
import { LANGUAGES } from "@/constants/LANGUAGES";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import { accountPages } from "../Layout/LayoutAccount";

interface NavItemProps {
  title: string;
  id: string;
  href: string;
}

interface Props {
  handleMobileMenuClick: () => void;
  pages: Array<{
    title: string;
    id: string;
    href?: string;
    children?: Array<NavItemProps>;
  }>;
  colorInvert?: boolean;
}

const NavigationBar = ({
  handleMobileMenuClick,
  pages = [],
}: Props): JSX.Element => {
  const theme = useTheme();
  const session = useSession();
  const { mode } = theme.palette;
  const router = useRouter();
  const { t, i18n } = useTranslation("common");
  const [anchorEl, setAnchorEl] = useState<Nullable<HTMLElement>>(null);
  const open = Boolean(anchorEl);
  const changeTo = router.locale === LANGUAGES.RU ? LANGUAGES.EN : LANGUAGES.RU;

  const onToggleLanguageClick = (newLocale: string) => {
    const { pathname, asPath, query } = router;
    i18n.changeLanguage(newLocale);
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      width={1}
    >
      <Link
        href="/"
        onClick={(event) => {
          if (router.pathname === "/") {
            event.preventDefault();
          }
        }}
      >
        <Image
          alt="Cencoins logo"
          width={101}
          height={16}
          src={"/images/logo-b.svg"}
        />
      </Link>
      <Box sx={{ display: { xs: "none", md: "flex" } }} alignItems={"center"}>
        {pages.map((p, i) => (
          <Box key={i} marginLeft={3}>
            {!p.children ? (
              <Link href={p.href ?? ""} style={{ textDecoration: "none" }}>
                <MuiLink
                  component="span"
                  color={"text.primary"}
                  underline={"none"}
                  sx={{
                    "&:hover": {
                      color: "primary.main",
                    },
                  }}
                >
                  {t(p.title)}
                </MuiLink>
              </Link>
            ) : (
              <NavItem title={p.title} items={p.children} id={p.id} />
            )}
          </Box>
        ))}
        {session.status === "unauthenticated" && (
          <>
            <Box marginLeft={3}>
              <Link href="/login">
                <Button
                  variant="outlined"
                  size="large"
                  color={mode === "light" ? "primary" : "info"}
                  sx={{
                    height: 42,
                    borderColor:
                      mode === "light" ? "" : alpha(theme.palette.divider, 0.2),
                  }}
                >
                  {t("Войти")}
                </Button>
              </Link>
            </Box>
            <Box marginLeft={3}>
              <Link href="/signup">
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  style={{ height: 42 }}
                >
                  {t("Регистрация")}
                </Button>
              </Link>
            </Box>
          </>
        )}
        <Box marginLeft={3}>
          <ThemeModeToggler />
        </Box>
        <Box marginLeft={3}>
          <Button
            variant="outlined"
            style={{ cursor: "pointer" }}
            onClick={() => onToggleLanguageClick(changeTo)}
            color={mode === "light" ? "primary" : "info"}
            sx={{
              borderRadius: 2,
              minWidth: "auto",
              padding: 1,
              height: 42,
              width: 42,
              borderColor: alpha(theme.palette.divider, 0.2),
            }}
          >
            {(changeTo !== LANGUAGES.EN
              ? LANGUAGES.EN
              : LANGUAGES.RU
            ).toLocaleUpperCase()}
          </Button>
        </Box>
        {session.status === "authenticated" && (
          <>
            <Box marginLeft={1.5}>
              <IconButton
                color="primary"
                onClick={(event) => handleClick(event)}
                sx={{
                  width: 42,
                  height: 42,
                }}
              >
                <AccountCircleIcon fontSize="large" />
              </IconButton>
            </Box>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              sx={{
                top: 8,
                "& .MuiList-root": {
                  borderTop: `2px solid ${theme.palette.primary.main}`,
                },
              }}
            >
              {accountPages.map((item) => (
                <MenuItem
                  key={item.id}
                  onClick={async () => {
                    if (item.id === "logout") {
                      return await signOut();
                    }
                    await router.push(item.href);
                    handleClose();
                  }}
                  sx={{
                    minWidth: 270,
                  }}
                >
                  {t(item.title)}
                </MenuItem>
              ))}
            </Menu>
          </>
        )}
      </Box>
      <Box sx={{ display: { xs: "block", md: "none" } }} alignItems={"center"}>
        <Grid container spacing={1.25}>
          {session.status === "authenticated" && (
            <Grid item>
              <IconButton
                color="primary"
                onClick={(event) => handleClick(event)}
                sx={{
                  width: 42,
                  height: 42,
                }}
              >
                <AccountCircleIcon fontSize="large" />
              </IconButton>
            </Grid>
          )}
          {session.status === "unauthenticated" && (
            <>
              <Grid item>
                <Link href="/login">
                  <Button
                    variant="outlined"
                    size="small"
                    color={mode === "light" ? "primary" : "info"}
                    sx={{
                      height: 42,
                      borderColor:
                        mode === "light"
                          ? ""
                          : alpha(theme.palette.divider, 0.2),
                    }}
                  >
                    {t("Войти")}
                  </Button>
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{
                      height: 42,
                    }}
                  >
                    {t("Регистрация")}
                  </Button>
                </Link>
              </Grid>
            </>
          )}
          <Grid item>
            <Button
              onClick={() => handleMobileMenuClick()}
              aria-label="Menu"
              variant={"outlined"}
              sx={{
                borderRadius: 2,
                minWidth: "auto",
                padding: 1,
                borderColor: alpha(theme.palette.divider, 0.2),
              }}
            >
              <MenuIcon />
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default NavigationBar;
