import { useState, useEffect, PropsWithChildren } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@/components/Container/Container";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

export const accountPages = [
  {
    id: "profile",
    href: "/account/profile",
    title: "Профиль",
  },
  {
    id: "payment",
    href: "/account/payment",
    title: "Оплата",
  },
  {
    id: "settings",
    href: "/account/settings",
    title: "Настройки",
  },
  {
    id: "notifications",
    href: "/account/notifications",
    title: "Уведомления",
  },
  {
    id: "support",
    href: "/account/support",
    title: "Поддержка",
  },
  {
    id: "logout",
    href: "/account/logout",
    title: "Выход",
  },
];

interface Props {}

export const LayoutAccount: React.FC<PropsWithChildren<Props>> = ({
  children,
}) => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    setActiveLink(router.pathname);
  }, [router.pathname]);

  const theme = useTheme();

  return (
    <Box>
      <Box bgcolor={"primary.main"} paddingY={4}>
        <Container>
          <Typography
            variant="h4"
            fontWeight={700}
            gutterBottom
            sx={{ color: "common.white" }}
          >
            {t("Настройки аккаунта")}
          </Typography>
          <Typography variant="h6" sx={{ color: "common.white" }}>
            {t("Изменение информации учетной записи и настройка сканера")}
          </Typography>
        </Container>
      </Box>
      <Container paddingTop={"0 !important"} marginTop={-8}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Card sx={{ boxShadow: 3 }}>
              <List
                disablePadding
                sx={{
                  display: { xs: "inline-flex", md: "flex" },
                  flexDirection: { xs: "row", md: "column" },
                  overflow: "auto",
                  flexWrap: "nowrap",
                  width: "100%",
                  paddingY: { xs: 3, md: 4 },
                  paddingX: { xs: 4, md: 0 },
                }}
              >
                {accountPages.map((item) => (
                  <ListItem
                    key={item.id}
                    component={Link}
                    href={item.href}
                    disableGutters
                    onClick={(event) => {
                      if (item.id === "logout") {
                        event.preventDefault();
                        signOut();
                      }
                    }}
                    sx={{
                      marginRight: { xs: 2, md: 0 },
                      flex: 0,
                      paddingX: { xs: 0, md: 3 },
                      borderLeft: {
                        xs: "none",
                        md: "2px solid transparent",
                      },
                      borderLeftColor: {
                        md: activeLink.includes(item.href)
                          ? theme.palette.primary.main
                          : "transparent",
                      },
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      noWrap
                      color={
                        activeLink === item.href
                          ? "text.primary"
                          : "text.secondary"
                      }
                    >
                      {t(item.title)}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Card>
          </Grid>
          <Grid item xs={12} md={9}>
            <Card sx={{ boxShadow: 3, padding: 4 }}>{children}</Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
