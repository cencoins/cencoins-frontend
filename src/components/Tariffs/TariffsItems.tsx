import { $tariffs } from "@/stores/tariffs.effector";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { useUnit } from "effector-react";
import { useMemo } from "react";
import { useTranslation } from "next-i18next";
import { useTheme } from "@mui/material";

export const TariffsItems = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const tariffs = useUnit($tariffs);

  const currentPeriod = useMemo(
    () =>
      tariffs.periods.find(
        (period) => period.contents[0].text === tariffs.selectedPeriod,
      ),
    [tariffs.periods, tariffs.selectedPeriod],
  );

  return (
    <Grid container spacing={4} mb={9.5}>
      {currentPeriod?.tariffs.map((tariff, i) => (
        <Grid item xs={12} md={4} key={i}>
          <Box
            component={Card}
            height={1}
            display={"flex"}
            flexDirection={"column"}
            variant={"outlined"}
          >
            <CardContent
              sx={{
                padding: 4,
              }}
            >
              <Box marginBottom={2}>
                <Typography variant={"h4"} fontWeight={600} gutterBottom>
                  {
                    tariff.sections.find(
                      (section) => section.mnemonic === "Name",
                    )?.contents[0].text
                  }
                </Typography>
                <Typography color={"text.secondary"}>
                  {
                    tariff.sections.find(
                      (section) => section.mnemonic === "Description",
                    )?.contents[0].text
                  }
                </Typography>
              </Box>
              <Box display={"flex"} alignItems={"baseline"} marginBottom={2}>
                <Typography variant={"h3"} fontWeight={700}>
                  ${tariff.price.price}
                </Typography>
                <Typography
                  variant={"subtitle1"}
                  color={"text.secondary"}
                  fontWeight={700}
                >
                  {tariffs.selectedPeriod ===
                  tariffs.periods[0].contents[0].text
                    ? "/mo"
                    : "/y"}
                </Typography>
              </Box>
              <Grid container spacing={1}>
                {tariff.permissions.map((permission, index) => (
                  <Grid item xs={12} key={index}>
                    <Box
                      component={ListItem}
                      disableGutters
                      width={"auto"}
                      padding={0}
                    >
                      <Box
                        component={ListItemAvatar}
                        minWidth={"auto !important"}
                        marginRight={2}
                      >
                        <Box
                          component={Avatar}
                          bgcolor={theme.palette.primary.main}
                          width={20}
                          height={20}
                        >
                          <svg
                            width={12}
                            height={12}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </Box>
                      </Box>
                      <ListItemText
                        primary={`${permission.limit} ${permission.contents[0].text}`}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
            <Box flexGrow={1} />
            <CardActions sx={{ justifyContent: "flex-end", padding: 4 }}>
              <Button size={"large"} variant={"contained"}>
                {t("Купить")}
              </Button>
            </CardActions>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};
