import { ReactElement } from "react";
import { getInitialServerSideProps } from "@/utils/getInitialServerSide";
import Box from "@mui/material/Box";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { LANGUAGES } from "@/constants/LANGUAGES";
import { DICTIONARY } from "@/constants/DICTIONARY";
import { GetServerSideProps } from "next";
import { LayoutAccount } from "@/components/Layout/LayoutAccount";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Grid } from "@mui/material";
import { Telegram } from "@/components/Company/Socials/Telegram";
import { Email } from "@/components/Company/Socials/Email";

interface Props {}

const AccountSupport = ({}: Props) => {
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>{t("Поддержка")}</title>
      </Head>
      <Box>
        <Typography variant="h6" gutterBottom fontWeight={700}>
          {t("Поддержка")}
        </Typography>
        <Typography variant={"subtitle2"} color={"text.secondary"}>
          {t("Связаться с нами для консультации")}
        </Typography>
        <Box paddingY={4}>
          <Divider />
        </Box>
        <Grid container spacing={9} alignItems="center">
          <Grid item>
            <Telegram />
          </Grid>
          <Grid item>
            <Email />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

AccountSupport.getLayout = (page: ReactElement) => {
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

export default AccountSupport;
