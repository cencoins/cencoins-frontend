import Head from "next/head";
import Container from "@/components/Container/Container";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { LANGUAGES } from "@/constants/LANGUAGES";
import { DICTIONARY } from "@/constants/DICTIONARY";
import { getInitialServerSideProps } from "@/utils/getInitialServerSide";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import { TableArbitrage } from "@/components/TableArbitrage/TableArbitrage";

interface Props {}

const Home = () => {
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>Cencoins</title>
      </Head>
      <Container>
        <Box marginBottom={7}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
            }}
          >
            {t("Арбитражный сканер")}
          </Typography>
        </Box>
        <Box>
          <TableArbitrage />
        </Box>
      </Container>
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
