import Head from "next/head";
import { EffectorNext } from "@effector/next";
import Container from "@/components/Container/Container";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { LANGUAGES } from "@/constants/LANGUAGES";
import { DICTIONARY } from "@/constants/DICTIONARY";
import { getInitialServerSideProps } from "@/utils/getInitialServerSide";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import { TableArbitrage } from "@/components/TableArbitrage/TableArbitrage";
import { ServiceFilters } from "@/service/ServiceFilters/ServiceFilters";
import { allSettled, fork, serialize } from "effector";
import { setDataArbitrageFilter } from "@/stores/arbitrage/arbitrageFilter.effector";
import { TableArbitrageFilter } from "@/components/TableArbitrage/TableArbitrageFilter";

interface Props {
  values: Record<string, unknown>;
}

const Home = (props: Props) => {
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
          <EffectorNext values={props.values}>
            <Box>
              <Box mb={2.5}>
                <TableArbitrageFilter />
              </Box>
              <Box>
                <TableArbitrage />
              </Box>
            </Box>
          </EffectorNext>
        </Box>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context,
) => {
  let response;
  const responseMarkets = await ServiceFilters.getMarkets();
  const responseCoins = await ServiceFilters.getCoins();

  try {
    const allRequests = await Promise.all([responseMarkets, responseCoins]);
    response = allRequests;
  } catch (error) {}

  const scope = fork();

  if (response) {
    await allSettled(setDataArbitrageFilter, {
      scope,
      params: {
        markets: response[0].data || [],
        coins: response[1].data || [],
      },
    });
  }

  return {
    props: {
      values: serialize(scope),
      ...(await getInitialServerSideProps(context)),
      ...(await serverSideTranslations(context.locale ?? LANGUAGES.RU, [
        DICTIONARY.COMMON,
      ])),
    },
  };
};

export default Home;
