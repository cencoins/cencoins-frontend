import Head from "next/head";
import Container from "@/components/Container/Container";
import { Box } from "@mui/material";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { LANGUAGES } from "@/constants/LANGUAGES";
import { DICTIONARY } from "@/constants/DICTIONARY";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { Link as MuiLink } from "@mui/material";
import Link from "next/link";
import { getSession } from "next-auth/react";

interface Props {}

const Login = () => {
  const { t, i18n } = useTranslation("common");

  return (
    <>
      <Head>
        <title>{t("Войти")}</title>
      </Head>
      <Container>
        <Container maxWidth={680} margin={0} paddingX={0} paddingY={0}>
          <Box marginBottom={4}>
            <Typography
              sx={{
                textTransform: "uppercase",
              }}
              gutterBottom
              color={"text.secondary"}
              fontWeight={700}
            >
              {t("Войти")}
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
              }}
            >
              {t("Добро пожаловать")}
            </Typography>
            <Typography color="text.secondary">
              {t("Войдите, чтобы управлять своим аккаунтом.")}
            </Typography>
          </Box>
          <Card sx={{ p: { xs: 4, md: 6 } }}>
            <form>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Typography variant={"subtitle2"} sx={{ marginBottom: 2 }}>
                    {t("Введите ваш email")}
                  </Typography>
                  <TextField
                    label="Email"
                    variant="outlined"
                    name={"email"}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box
                    display="flex"
                    flexDirection={{ xs: "column", sm: "row" }}
                    alignItems={{ xs: "stretched", sm: "center" }}
                    justifyContent={"space-between"}
                    width={1}
                    marginBottom={2}
                  >
                    <Box marginBottom={{ xs: 1, sm: 0 }}>
                      <Typography variant={"subtitle2"}>
                        {t("Введите ваш пароль")}
                      </Typography>
                    </Box>
                    <Typography variant={"subtitle2"}>
                      <Link
                        href={"/"}
                        locale={i18n.language}
                        style={{ textDecoration: "none" }}
                      >
                        <MuiLink
                          component="span"
                          color={"primary"}
                          underline="none"
                        >
                          {t("Забыли свой пароль?")}
                        </MuiLink>
                      </Link>
                    </Typography>
                  </Box>
                  <TextField
                    label={t("Пароль")}
                    variant="outlined"
                    name={"password"}
                    type={"password"}
                    fullWidth
                  />
                </Grid>
                <Grid item container xs={12}>
                  <Box
                    display="flex"
                    flexDirection={{ xs: "column", sm: "row" }}
                    alignItems={{ xs: "stretched", sm: "center" }}
                    justifyContent={"space-between"}
                    width={1}
                    maxWidth={600}
                    margin={"0 auto"}
                  >
                    <Box marginBottom={{ xs: 1, sm: 0 }}>
                      <Typography variant={"subtitle2"}>
                        {t("У вас до сих пор нет аккаута?")}{" "}
                        <Link
                          href={"/signup"}
                          locale={i18n.language}
                          style={{ textDecoration: "none" }}
                        >
                          <MuiLink
                            component="span"
                            color={"primary"}
                            underline="none"
                          >
                            {t("Зарегистрироваться тут.")}
                          </MuiLink>
                        </Link>
                      </Typography>
                    </Box>
                    <Button
                      size={"large"}
                      variant={"contained"}
                      type={"submit"}
                    >
                      {t("Войти")}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Card>
        </Container>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context,
) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: `/${context.locale}/`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(context.locale ?? LANGUAGES.RU, [
        DICTIONARY.COMMON,
      ])),
    },
  };
};

export default Login;
