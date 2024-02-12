import { useState } from "react";
import dynamic from "next/dynamic";
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
import { onChangeModalAdd } from "@/stores/modalAddCoin";
import { TableFilterButton } from "../Table/TableFilterButton";
import { TableFilterChip } from "../Table/TableFilterChip";

const ModalAddCoin = dynamic(
  () =>
    import("../Modal/ModalAddCoin/ModalAddCoin").then(
      (module) => module.ModalAddCoin,
    ),
  { ssr: false },
);

const ModalDepSpread = dynamic(
  () =>
    import("../Modal/ModalDepSpread/ModalDepSpread").then(
      (module) => module.ModalDepSpread,
    ),
  { ssr: false },
);

const ModalAddExchange = dynamic(
  () =>
    import("../Modal/ModalAddExchange/ModalAddExchange").then(
      (module) => module.ModalAddExchange,
    ),
  { ssr: false },
);

import SettingsIcon from "@mui/icons-material/Settings";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import { onChangeModalDepSpread } from "@/stores/modalDepSpread";
import { onChangeModalAddExchange } from "@/stores/modalAddExchange";
import { useUnit } from "effector-react";
import { $arbitrage, onShowSelected } from "@/stores/arbitrage.effector";

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
  const arbitrage = useUnit($arbitrage);
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
                    isActive={arbitrage.showSelected}
                    startIcon={
                      arbitrage.showSelected ? <StarIcon /> : <StarBorderIcon />
                    }
                    onClick={() => onShowSelected()}
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
                    active
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
                isActive
                variant="contained"
                size="small"
                onClick={() => onChangeModalAdd({ open: true })}
                startIcon={<CurrencyBitcoinIcon />}
              >
                {t("Монета")}
              </TableFilterButton>
            </Grid>
            <Grid item>
              <TableFilterButton
                isActive
                variant="contained"
                size="small"
                onClick={() => onChangeModalAddExchange({ open: true })}
                startIcon={<SyncAltIcon />}
              >
                {t("Биржи")}
              </TableFilterButton>
            </Grid>
            <Grid item>
              <TableFilterButton
                isActive
                variant="contained"
                size="small"
                onClick={() => onChangeModalDepSpread({ open: true })}
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
      <ModalAddCoin />
      <ModalDepSpread />
      <ModalAddExchange />
    </>
  );
};
