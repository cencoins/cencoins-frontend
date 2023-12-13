import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link as MuiLink } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";

export const Footer = (): JSX.Element => {
  const theme = useTheme();
  const { mode } = theme.palette;
  const { t, i18n } = useTranslation("common");

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          width={1}
          flexDirection={{ xs: "column", sm: "row" }}
        >
          <Link href="/" locale={i18n.language}>
            <Image
              alt="Cencoins logo"
              width={101}
              height={16}
              src={mode === "light" ? "/images/logo.svg" : "/images/logo.svg"}
            />
          </Link>
          <Box display="flex" flexWrap={"wrap"} alignItems={"center"}>
            <Box marginTop={1} marginRight={2}>
              <Link
                href={"/terms"}
                locale={i18n.language}
                style={{ textDecoration: "none" }}
              >
                <MuiLink
                  underline="none"
                  component="span"
                  color="text.primary"
                  variant={"subtitle2"}
                >
                  {t("Условия обслуживания")}
                </MuiLink>
              </Link>
            </Box>
            <Box marginTop={1} marginRight={2}>
              <Link
                href={"/policy"}
                locale={i18n.language}
                style={{ textDecoration: "none" }}
              >
                <MuiLink
                  underline="none"
                  component="span"
                  color="text.primary"
                  variant={"subtitle2"}
                >
                  {t("Политика конфиденциальности")}
                </MuiLink>
              </Link>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography
          align={"center"}
          variant={"subtitle2"}
          color="text.secondary"
          gutterBottom
        >
          &copy; Cencoins. {new Date().getFullYear()}, {t("Все права защищены")}
        </Typography>
        <Typography
          align={"center"}
          variant={"caption"}
          color="text.secondary"
          component={"p"}
        >
          {t("Футер.Куки")}
        </Typography>
      </Grid>
    </Grid>
  );
};
