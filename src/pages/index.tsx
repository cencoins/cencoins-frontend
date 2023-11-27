import Container from "@/components/Container/Container";
import { Box } from "@mui/material";
import { GetStaticProps } from "next";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { LANGUAGES } from "@/constants/LANGUAGES";
import { DICTIONARY } from "@/constants/DICTIONARY";

interface Props {}

const Home = () => {
  return (
    <>
      <Head>
        <title>Cencoins</title>
      </Head>
      <Container>
        <Box height={1500}>
          <h1>cencoins-client</h1>
        </Box>
      </Container>
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? LANGUAGES.RU, [
      DICTIONARY.COMMON,
    ])),
  },
});

export default Home;
