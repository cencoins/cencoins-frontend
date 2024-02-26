import { MouseEvent, useCallback } from "react";
import { Grid } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
// import StarIcon from "@mui/icons-material/Star";
// import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useUnit } from "effector-react";
// import { $arbitrage, onShowSelected } from "@/stores/arbitrage.effector";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { TableFilterButton } from "../Table/TableFilterButton";
import { $arbitrageFilter } from "@/stores/arbitrage/arbitrageFilter.effector";
// import { TableFilterChip } from "../Table/TableFilterChip";

export const TableArbitrageFilter: React.FC = () => {
  const { t } = useTranslation();
  // const arbitrage = useUnit($arbitrage);
  const arbitrageFilter = useUnit($arbitrageFilter);
  const router = useRouter();
  const session = useSession();

  // eslint-disable-next-line no-console
  console.log({ arbitrageFilter });

  const onSettingsClick = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      if (session.status === "unauthenticated") {
        event.preventDefault();
        router.push("/login");
      }
    },
    [router, session.status],
  );

  return (
    <>
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
              <Link href="/account/settings">
                <TableFilterButton
                  variant="contained"
                  size="small"
                  startIcon={<SettingsIcon />}
                  onClick={onSettingsClick}
                >
                  {t("Настроить")}
                </TableFilterButton>
              </Link>
            </Grid>
            {/* <Grid item>
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
            </Grid> */}
          </Grid>
        </Grid>
        <Grid item>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            spacing={1.5}
          >
            {/* <Grid item>
              <TableFilterChip label={t("Пара")} onDelete={() => {}} />
            </Grid> */}
            {/* <Grid item>
              <TableFilterChip  label={t("Монета")} onDelete={() => {}} />
            </Grid>
            <Grid item>
              <TableFilterChip label={t("Покупка")} onDelete={() => {}} />
            </Grid>
            <Grid item>
              <TableFilterChip label={t("Продажа")} onDelete={() => {}} />
            </Grid> */}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
