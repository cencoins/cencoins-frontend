import Box from "@mui/material/Box";
import ThemeModeToggler from "../ThemeModeToggler/ThemeModeToggler";
import { toggleModalSignIn } from "@/stores/modals/ModalSignIn.effector";
import { toggleModalSignUp } from "@/stores/modals/ModalSignUp.effector";
import { Link } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { LANGUAGES } from "@/constants/LANGUAGES";

interface Props {
  colorInvert?: boolean;
}

const NavigationTop = ({ colorInvert = false }: Props): JSX.Element => {
  const session = useSession();
  const router = useRouter();
  const { t, i18n } = useTranslation("common");

  const changeTo = router.locale === LANGUAGES.RU ? LANGUAGES.EN : LANGUAGES.RU;

  const onToggleLanguageClick = (newLocale: string) => {
    const { pathname, asPath, query } = router;
    i18n.changeLanguage(newLocale);
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  return (
    <Box display="flex" justifyContent="flex-end" alignItems="center">
      {session.status === "authenticated" ? (
        <Box marginRight={{ xs: 1, sm: 2 }}>
          <Link
            underline="none"
            component="a"
            style={{ cursor: "pointer" }}
            onClick={() => signOut()}
            color={colorInvert ? "common.white" : "text.primary"}
            sx={{ display: "flex", alignItems: "center" }}
          >
            {t("Выйти")} {session.data.user?.email}
          </Link>
        </Box>
      ) : (
        <>
          <Box marginRight={{ xs: 1, sm: 2 }}>
            <Link
              underline="none"
              component="a"
              style={{ cursor: "pointer" }}
              onClick={() => toggleModalSignIn()}
              color={colorInvert ? "common.white" : "text.primary"}
              sx={{ display: "flex", alignItems: "center" }}
            >
              {t("Войти")}
            </Link>
          </Box>
          <Box marginRight={{ xs: 1, sm: 2 }}>
            <Link
              underline="none"
              component="a"
              style={{ cursor: "pointer" }}
              onClick={() => toggleModalSignUp()}
              color={colorInvert ? "common.white" : "text.primary"}
              sx={{ display: "flex", alignItems: "center" }}
            >
              {t("Зарегистрироваться")}
            </Link>
          </Box>
        </>
      )}
      <Box marginRight={{ xs: 1, sm: 2 }}>
        <Link
          underline="none"
          component="a"
          style={{ cursor: "pointer" }}
          onClick={() => onToggleLanguageClick(changeTo)}
          color={colorInvert ? "common.white" : "text.primary"}
          sx={{ display: "flex", alignItems: "center" }}
        >
          {changeTo.toLocaleUpperCase()}
        </Link>
      </Box>
      <Box>
        <ThemeModeToggler />
      </Box>
    </Box>
  );
};

export default NavigationTop;
