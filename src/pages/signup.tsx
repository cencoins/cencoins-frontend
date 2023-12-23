import Head from "next/head";
import Container from "@/components/Container/Container";
import { Box, InputAdornment } from "@mui/material";
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
import IconButton from "@mui/material/IconButton";
import { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { getSession } from "next-auth/react";
import {
  $signUp,
  onChangeSignUp,
  onSubmitSignUp,
  resetSignUp,
} from "@/stores/signUp.effector";
import { useUnit } from "effector-react";
import { useRouter } from "next/router";

interface Props {}

const Signup = () => {
  const { t, i18n } = useTranslation("common");
  const signUp = useUnit($signUp);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (signUp.isRegistered) {
      router.push("/login", undefined, { locale: i18n.language });
      resetSignUp();
    }
  }, [i18n.language, router, signUp.isRegistered]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  return (
    <>
      <Head>
        <title>{t("Регистрация")}</title>
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
              {t("Создать аккаунт")}
            </Typography>
          </Box>
          <Box>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                onSubmitSignUp();
              }}
            >
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Typography variant={"subtitle2"} sx={{ marginBottom: 2 }}>
                    {t("Введите ваше имя")}
                  </Typography>
                  <TextField
                    label="Ваше имя"
                    variant="outlined"
                    name={"name"}
                    value={signUp.name}
                    onChange={(event) =>
                      onChangeSignUp({ name: event.currentTarget.value })
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant={"subtitle2"} sx={{ marginBottom: 2 }}>
                    {t("Введите ваш email")}
                  </Typography>
                  <TextField
                    label="Email"
                    variant="outlined"
                    name={"email"}
                    value={signUp.email}
                    onChange={(event) =>
                      onChangeSignUp({ email: event.currentTarget.value })
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
                        {t("Придумайте пароль")}
                      </Typography>
                    </Box>
                  </Box>
                  <TextField
                    label={t(
                      "от 8 символов, минимум одна цифра и заглавная буква",
                    )}
                    variant="outlined"
                    name={"password"}
                    type={showPassword ? "text" : "password"}
                    value={signUp.password}
                    onChange={(event) =>
                      onChangeSignUp({ password: event.currentTarget.value })
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid
                  item
                  container
                  xs={12}
                  alignItems={"center"}
                  flexWrap={"nowrap"}
                >
                  <Checkbox defaultChecked />
                  <Box>
                    {t("Я хочу получать новости и предложения от Cencoins")}
                  </Box>
                </Grid>
                <Grid item container xs={12} marginBottom={{ xs: 2 }}>
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
                        {t("Уже есть аккаунт?")}{" "}
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
                            {t("Войти")}
                          </MuiLink>
                        </Link>
                      </Typography>
                    </Box>
                    <Button
                      size={"large"}
                      variant={"contained"}
                      type={"submit"}
                    >
                      {t("Зарегистрироваться")}
                    </Button>
                  </Box>
                </Grid>
                <Grid item container justifyContent={"center"}>
                  <Box maxWidth="434px" textAlign={"center"}>
                    <Typography variant={"subtitle2"}>
                      {t("Нажимая «Зарегистрироваться», вы соглашаетесь с")}{" "}
                      <Link
                        href={"/terms"}
                        locale={i18n.language}
                        style={{ textDecoration: "none" }}
                      >
                        <MuiLink
                          component="span"
                          color={"primary"}
                          underline="none"
                        >
                          {t("Условиями обслуживания")}
                        </MuiLink>
                      </Link>{" "}
                      {t("и")}{" "}
                      <Link
                        href={"/privacy"}
                        locale={i18n.language}
                        style={{ textDecoration: "none" }}
                      >
                        <MuiLink
                          component="span"
                          color={"primary"}
                          underline="none"
                        >
                          {t("Политикой конфиденциальности")}
                        </MuiLink>
                      </Link>
                    </Typography>
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

export default Signup;
