import { ReactElement } from "react";
import { getInitialServerSideProps } from "@/utils/getInitialServerSide";
import Box from "@mui/material/Box";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { LANGUAGES } from "@/constants/LANGUAGES";
import { DICTIONARY } from "@/constants/DICTIONARY";
import { GetServerSideProps } from "next";
import { LayoutAccount } from "@/components/Layout/LayoutAccount";
import { useTranslation } from "next-i18next";
import Head from "next/head";

interface Props {}

const AccountNotifications = ({}: Props) => {
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>{t("Уведомления")}</title>
      </Head>
      <Box>123</Box>
    </>
  );
};

AccountNotifications.getLayout = (page: ReactElement) => {
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

export default AccountNotifications;
