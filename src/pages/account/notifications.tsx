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
import {
  Button,
  Chip,
  Divider,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

interface Props {}

const AccountNotifications = ({}: Props) => {
  const { t } = useTranslation("common");
  const theme = useTheme();

  return (
    <>
      <Head>
        <title>{t("Уведомления")}</title>
      </Head>
      <Box>
        <Typography variant="h6" gutterBottom fontWeight={700} mb={2}>
          {t("Настройки уведомлений")}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t(
            "Настройке телеграм бота, укажите от какого % спреда хотите получать сигналы и сохраните настройки",
          )}
        </Typography>
        <Box paddingY={4}>
          <Divider />
        </Box>
        <Box>
          <Typography variant="body2" fontWeight={700} mb={2}>
            Telegram bot
          </Typography>
          <Button variant="contained">{t("Подключить")} Telegram</Button>
        </Box>
        <Box paddingY={4}>
          <Divider />
        </Box>
        <Box mb={3}>
          <Typography variant="body2" fontWeight={700} mb={2}>
            {t("Спред")}, %
          </Typography>
          <TextField fullWidth placeholder={"0,5"} />
        </Box>
        <Box mb={5}>
          <Box mb={1.2}>
            <Typography variant="caption" color="text.secondary">
              {t("Популярные варианты")}
            </Typography>
          </Box>
          <Grid container spacing={1.5}>
            {["> 0,5%", "> 1%", "> 1,5%", "> 2%", "> 3%"].map((item) => (
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
        <Box mb={9}>
          <Typography variant="caption" mb={2}>
            {t(
              "Укажите от какого % спреда хотите получать уведомления в Telegram. Например, если вы укажите 1%, то сигналы будут поступать в ситуациях, когда спред между покупкой и продажей будет > 1%",
            )}
          </Typography>
          <br />
          <Typography variant="caption" fontWeight={500}>
            {t(
              "Рекомендуем указывать значение не более 1% для большей выдачи результатов",
            )}
          </Typography>
        </Box>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Button variant="contained">{t("Сохранить")}</Button>
          </Grid>
        </Grid>
      </Box>
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
