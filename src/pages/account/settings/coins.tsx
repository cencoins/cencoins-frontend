import { ReactElement, useState } from "react";
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
import {
  Avatar,
  Button,
  Checkbox,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Switch,
  TextField,
} from "@mui/material";

interface Props {}

export const data = [
  {
    name: "Toncoin",
    shortName: "TON",
    logo: "/images/ton.svg",
  },
  {
    name: "Bybit",
    shortName: "BBT",
    logo: "/images/bybit.svg",
  },
];

const AccountSettingsCoins = ({}: Props) => {
  const { t } = useTranslation("common");
  const [checked, setChecked] = useState<string[]>([]);

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <>
      <Head>
        <title>
          {t("Настройки")} | {t("Монеты")}
        </title>
      </Head>
      <Box>
        <Box mb={4}>
          <Typography variant="body2" fontWeight={700} mb={2}>
            {t("Добавить монеты")}
          </Typography>
          <TextField fullWidth placeholder={t("Поиск")} />
        </Box>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          mb={7}
        >
          <Grid item>
            <Grid container alignItems="center">
              <Grid item>
                <Switch defaultChecked />
              </Grid>
              <Grid item>
                <Typography variant="body2" fontWeight={700}>
                  {t("Показать добавленные")}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="body2" color="text.secondary">
              {checked.length}/{data.length}
            </Typography>
          </Grid>
        </Grid>
        <Box mb={5.5}>
          <List dense sx={{ width: "100%" }}>
            {data.map(({ name, logo, shortName }) => {
              const labelId = `checkbox-list-coin-label-${name}`;
              return (
                <ListItem
                  key={name}
                  secondaryAction={
                    <Checkbox
                      edge="end"
                      onChange={handleToggle(name)}
                      checked={checked.indexOf(name) !== -1}
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  }
                  disablePadding
                >
                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar alt={shortName} src={logo} />
                    </ListItemAvatar>
                    <ListItemText
                      id={labelId}
                      primary={name}
                      secondary={shortName}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
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

AccountSettingsCoins.getLayout = (page: ReactElement) => {
  return (
    <LayoutAccount>
      <SettingsTabs initialTab={0} />
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

export default AccountSettingsCoins;
