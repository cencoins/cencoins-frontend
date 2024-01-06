import { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Grid,
  styled,
} from "@mui/material";
import { useTranslation } from "next-i18next";
import { TableFilterButton } from "../Table/TableFilterButton";
import { TableFilterChip } from "../Table/TableFilterChip";

import SettingsIcon from "@mui/icons-material/Settings";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import SyncAltIcon from "@mui/icons-material/SyncAlt";

const AccordionFilter = styled(Accordion)(() => ({
  background: "transparent",
  boxShadow: "none",
}));

const Summary = styled(AccordionSummary)(() => ({
  padding: 0,
  minHeight: "auto",
  "& .MuiAccordionSummary-content": {
    margin: 0,
  },
}));

const Details = styled(AccordionDetails)(() => ({
  padding: 0,
}));

export const TableArbitrageFilter: React.FC = () => {
  const { t } = useTranslation();
  const [settingsIsOpen, setSettingsIsOpen] = useState("");

  const handleAccordClick = (value: string) => {
    if (settingsIsOpen !== value) {
      setSettingsIsOpen(value);
    } else {
      setSettingsIsOpen("");
    }
  };

  return (
    <>
      <AccordionFilter
        disableGutters
        key="openAccordion"
        expanded={"openAccordion" === settingsIsOpen}
      >
        <Summary>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            spacing={4}
          >
            <Grid item>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                spacing={1.5}
              >
                <Grid item>
                  <TableFilterButton
                    isActive={"openAccordion" === settingsIsOpen}
                    variant="contained"
                    size="small"
                    startIcon={<SettingsIcon />}
                    onClick={() => handleAccordClick("openAccordion")}
                  >
                    {t("Настроить")}
                  </TableFilterButton>
                </Grid>
                <Grid item>
                  <TableFilterButton
                    variant="contained"
                    size="small"
                    startIcon={<StarBorderIcon />}
                  >
                    {t("Избранное")}
                  </TableFilterButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                spacing={1.5}
              >
                <Grid item>
                  <TableFilterChip label={t("Пара")} onDelete={() => {}} />
                </Grid>
                <Grid item>
                  <TableFilterChip
                    isActive
                    label={t("Монета")}
                    onDelete={() => {}}
                  />
                </Grid>
                <Grid item>
                  <TableFilterChip label={t("Покупка")} onDelete={() => {}} />
                </Grid>
                <Grid item>
                  <TableFilterChip label={t("Продажа")} onDelete={() => {}} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Summary>

        <Details>
          <Box my={2.5}>
            <Divider />
          </Box>
          <Grid container alignItems="center" spacing={1.5}>
            <Grid item>
              <TableFilterButton
                variant="contained"
                size="small"
                startIcon={<CurrencyBitcoinIcon />}
              >
                {t("Монета")}
              </TableFilterButton>
            </Grid>
            <Grid item>
              <TableFilterButton
                variant="contained"
                size="small"
                startIcon={<SyncAltIcon />}
              >
                {t("Биржи")}
              </TableFilterButton>
            </Grid>
            <Grid item>
              <TableFilterButton
                variant="contained"
                size="small"
                startIcon={
                  <SyncAltIcon style={{ transform: "rotate(90deg)" }} />
                }
              >
                {t("Спред и депозит")}
              </TableFilterButton>
            </Grid>
          </Grid>
        </Details>
      </AccordionFilter>
    </>
  );
};
