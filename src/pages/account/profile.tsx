import { ReactElement } from "react";
import { getInitialServerSideProps } from "@/utils/getInitialServerSide";
import Box from "@mui/material/Box";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { LANGUAGES } from "@/constants/LANGUAGES";
import { DICTIONARY } from "@/constants/DICTIONARY";
import { GetServerSideProps } from "next";
import { LayoutAccount } from "@/components/Layout/LayoutAccount";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useTranslation } from "next-i18next";
import { Button, Grid } from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Head from "next/head";

interface Props {}

const AccountProfile = () => {
  const { t } = useTranslation("common");
  const session = useSession();

  return (
    <>
      <Head>
        <title>{t("Профиль")}</title>
      </Head>
      <Box>
        <Typography variant="h6" gutterBottom fontWeight={700}>
          {t("Учетная запись")}
        </Typography>
        <Box paddingY={4}>
          <Divider />
        </Box>
        <Box mb={10}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h6" fontWeight={400} mb={3}>
                {t("Данные профиля")}
              </Typography>
              <Typography variant="body2" fontWeight={700} mb={3}>
                Email:{" "}
                <Typography component="span" variant="body2" fontWeight={400}>
                  {session.data?.user?.email}
                </Typography>
              </Typography>
            </Grid>
            <Grid item>
              <Link href="/account/reset-password">
                <Button variant="outlined">{t("Сбросить пароль")}</Button>
              </Link>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h6" fontWeight={400} mb={3}>
                {t("Биллинг")}
              </Typography>
              <Typography variant="body2" fontWeight={700} mb={3}>
                Тип подписки:{" "}
                <Typography component="span" variant="body2" fontWeight={400}>
                  Enterprise
                </Typography>
              </Typography>
              <Typography variant="body2" fontWeight={700} mb={3}>
                Статус:{" "}
                <Typography component="span" variant="body2" fontWeight={400}>
                  активная
                </Typography>
              </Typography>
              <Typography variant="body2" fontWeight={700} mb={3}>
                Дата окончания:{" "}
                <Typography component="span" variant="body2" fontWeight={400}>
                  12.02.2024
                </Typography>
              </Typography>
            </Grid>
            <Grid item>
              <Link href="/account/payment">
                <Button variant="contained">{t("Управление")}</Button>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

AccountProfile.getLayout = (page: ReactElement) => {
  return <LayoutAccount>{page}</LayoutAccount>;
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context,
) => {
  const ssrProps = await getInitialServerSideProps(context);

  if (!ssrProps.session) {
    return {
      redirect: {
        destination: `/${context.locale}`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      ...ssrProps,
      ...(await serverSideTranslations(context.locale ?? LANGUAGES.RU, [
        DICTIONARY.COMMON,
      ])),
    },
  };
};

export default AccountProfile;
