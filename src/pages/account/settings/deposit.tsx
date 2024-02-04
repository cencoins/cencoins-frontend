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
import { SettingsTabs } from "@/components/Account/Settings/SettingsTabs";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Button, Chip, Grid, useTheme } from "@mui/material";

interface Props {}

const AccountSettingsDeposit = ({}: Props) => {
  const { t } = useTranslation("common");
  const theme = useTheme();

  return (
    <>
      <Head>
        <title>
          {t("Настройки")} | {t("Депозит")}
        </title>
      </Head>
      <Box>
        <Box mb={3}>
          <Typography variant="body2" fontWeight={700} mb={2}>
            {t("Депозит")}, USDT
          </Typography>
          <TextField fullWidth placeholder={"100"} />
        </Box>
        <Box mb={5}>
          <Box mb={1.2}>
            <Typography variant="caption" color="text.secondary">
              {t("Популярные варианты")}
            </Typography>
          </Box>
          <Grid container spacing={1.5}>
            {[
              "10",
              "20",
              "50",
              "100",
              "200",
              "500",
              "1000",
              "2000",
              "5000",
              "7500",
            ].map((item) => (
              <Grid item key={item}>
                <Chip
                  label={item}
                  style={{
                    cursor: "pointer",
                    padding: theme.spacing(1, 0.5),
                    borderRadius: theme.spacing(1),
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      <Box mb={9}>
        <Typography variant="caption" color="text.secondary">
          {t(
            "Укажите доступный депозит в USDT. Сканер будет учитывать сумму при поиске арбитражных ситуаций и отображения корректной цены",
          )}
        </Typography>
      </Box>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Button variant="contained">{t("Сохранить")}</Button>
        </Grid>
      </Grid>
    </>
  );
};

AccountSettingsDeposit.getLayout = (page: ReactElement) => {
  return (
    <LayoutAccount>
      <SettingsTabs initialTab={1} />
      <Box>{page}</Box>
    </LayoutAccount>
  );
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

export default AccountSettingsDeposit;
