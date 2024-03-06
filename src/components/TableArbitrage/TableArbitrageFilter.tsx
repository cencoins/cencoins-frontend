import { MouseEvent, useCallback, useMemo } from "react";
import { Grid } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useUnit } from "effector-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { TableFilterButton } from "../Table/TableFilterButton";
import {
  $arbitrageFilter,
  onDeleteArbitrageFilter,
  onResetArbitrageFilter,
  onSelectArbitrageFilter,
} from "@/stores/arbitrage/arbitrageFilter.effector";
import { TableFilterChip } from "../Table/TableFilterChip";

export const TableArbitrageFilter: React.FC = () => {
  const { t } = useTranslation();

  const arbitrageFilter = useUnit($arbitrageFilter);
  const router = useRouter();
  const session = useSession();

  const onSelectFilter = useUnit(onSelectArbitrageFilter);
  const onResetFilter = useUnit(onResetArbitrageFilter);
  const onDeleteChip = useUnit(onDeleteArbitrageFilter);

  const coinOptions = useMemo(
    () =>
      arbitrageFilter.coins.map((item) => ({
        id: item.id,
        title: item.name,
        iconUrl: item.iconUrl,
      })),
    [arbitrageFilter.coins],
  );

  const marketOptions = useMemo(
    () =>
      arbitrageFilter.markets.map((item) => ({
        id: item.id,
        title: item.name,
        iconUrl: item.iconUrl,
      })),
    [arbitrageFilter.markets],
  );

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
              <TableFilterChip
                label={t("Монета")}
                options={coinOptions}
                isActive={Boolean(arbitrageFilter.selectedCoinIds.length)}
                selectedIds={arbitrageFilter.selectedCoinIds}
                onResetFilter={() => onResetFilter({ key: "selectedCoinIds" })}
                onSelectFilter={(value: string) =>
                  onSelectFilter({ key: "selectedCoinIds", value })
                }
                onDeleteChip={(value: string) =>
                  onDeleteChip({ key: "selectedCoinIds", value })
                }
              />
            </Grid>
            <Grid item>
              <TableFilterChip
                label={t("Покупка")}
                options={marketOptions}
                isActive={Boolean(arbitrageFilter.selectedMarketBuyIds.length)}
                selectedIds={arbitrageFilter.selectedMarketBuyIds}
                onResetFilter={() =>
                  onResetFilter({ key: "selectedMarketBuyIds" })
                }
                onSelectFilter={(value: string) =>
                  onSelectFilter({ key: "selectedMarketBuyIds", value })
                }
                onDeleteChip={(value: string) =>
                  onDeleteChip({ key: "selectedMarketBuyIds", value })
                }
              />
            </Grid>
            <Grid item>
              <TableFilterChip
                label={t("Продажа")}
                options={marketOptions}
                isActive={Boolean(arbitrageFilter.selectedMarketBidIds.length)}
                selectedIds={arbitrageFilter.selectedMarketBidIds}
                onResetFilter={() =>
                  onResetFilter({ key: "selectedMarketBidIds" })
                }
                onSelectFilter={(value: string) =>
                  onSelectFilter({ key: "selectedMarketBidIds", value })
                }
                onDeleteChip={(value: string) =>
                  onDeleteChip({ key: "selectedMarketBidIds", value })
                }
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
