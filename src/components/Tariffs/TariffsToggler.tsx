import { $tariffs, setPeriodTariffs } from "@/stores/tariffs.effector";
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useUnit } from "effector-react";

export const TariffsToggler = () => {
  const theme = useTheme();
  const tariffs = useUnit($tariffs);

  const isMd = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true,
  });

  const onSetPeriodTariffs = useUnit(setPeriodTariffs);

  const handleClick = (_: unknown, newPricingOption: string) => {
    onSetPeriodTariffs(newPricingOption);
  };

  return (
    <Box display={"flex"} justifyContent={"center"} marginBottom={4}>
      <ToggleButtonGroup
        value={tariffs.selectedPeriod}
        exclusive
        onChange={handleClick}
      >
        {tariffs.periods.map((period) => {
          return (
            <ToggleButton
              key={period.id}
              value={period.contents[0].text}
              size={isMd ? "large" : "small"}
              sx={{
                minWidth: "78px",
                backgroundColor:
                  tariffs.selectedPeriod === period.contents[0].text
                    ? `${theme.palette.primary.light} !important`
                    : "transparent",
                border: `1px solid ${theme.palette.primary.main}`,
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 700,
                  color:
                    tariffs.selectedPeriod === period.contents[0].text
                      ? "common.white"
                      : "text.primary",
                }}
              >
                {period.contents[0].text}
              </Typography>
            </ToggleButton>
          );
        })}
      </ToggleButtonGroup>
    </Box>
  );
};
