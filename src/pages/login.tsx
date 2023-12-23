import Head from "next/head";
import Container from "@/components/Container/Container";
import { Box } from "@mui/material";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { LANGUAGES } from "@/constants/LANGUAGES";
import { DICTIONARY } from "@/constants/DICTIONARY";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { Link as MuiLink } from "@mui/material";
import Link from "next/link";
import { getSession, useSession } from "next-auth/react";
import { useUnit } from "effector-react";
import {
  $signIn,
  onChangeSignIn,
  onSubmitSignIn,
} from "@/stores/signIn.effector";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface Props {}

const Login = () => {
  const { t, i18n } = useTranslation("common");
  const signIn = useUnit($signIn);
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/", undefined, { locale: i18n.language });
    }
  }, [i18n.language, router, session]);

  return (
    <>
      <Head>
        <title>{t("Войти")}</title>
      </Head>
      <Container>
        <Container maxWidth={580} margin={0} paddingX={0} paddingY={0}>
          <Box marginBottom={4}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
              }}
            >
              {t("С возвращением")}
            </Typography>
          </Box>
          <Box>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                onSubmitSignIn();
              }}
            >
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Typography variant={"subtitle2"} sx={{ marginBottom: 2 }}>
                    {t("Введите ваш email")}
                  </Typography>
                  <TextField
                    label="Email"
                    variant="outlined"
                    name={"email"}
                    value={signIn.email}
                    onChange={(event) =>
                      onChangeSignIn({ email: event.currentTarget.value })
                    }
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
                    value={signIn.password}
                    onChange={(event) =>
                      onChangeSignIn({
                        password: event.currentTarget.value,
                      })
                    }
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
                        {t("Еще нет аккаунта?")}{" "}
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
          </Box>
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
