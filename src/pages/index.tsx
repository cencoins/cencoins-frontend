import Head from "next/head";
import Container from "@/components/Container/Container";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { LANGUAGES } from "@/constants/LANGUAGES";
import { DICTIONARY } from "@/constants/DICTIONARY";
import { getInitialServerSideProps } from "@/utils/getInitialServerSide";

interface Props {}

const Home = () => {
  return (
    <>
      <Head>
        <title>Cencoins</title>
      </Head>
      <Container>{/* { children } */}</Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context,
) => {
  return {
    props: {
      ...(await getInitialServerSideProps(context)),
      ...(await serverSideTranslations(context.locale ?? LANGUAGES.RU, [
        DICTIONARY.COMMON,
      ])),
    },
  };
};

export default Home;
