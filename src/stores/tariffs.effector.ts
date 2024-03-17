import { createEvent, createStore } from "effector";
import { Period } from "@/service/ServicePeriods/ServicePeriods.dto";
import { Tariff } from "@/service/ServiceTariffs/ServiceTariffs.dto";

export interface TariffsStorePeriod extends Period {
  tariffs: Tariff[];
}

export interface TariffsStore {
  selectedPeriod: string;
  periods: TariffsStorePeriod[];
}

export const setDataTarrifs = createEvent<Partial<TariffsStore>>();
export const setPeriodTariffs = createEvent<string>();

export const $tariffs = createStore<TariffsStore>(
  {
    selectedPeriod: "",
    periods: [],
  },
  { sid: "tariffs" },
)
  .on(setDataTarrifs, (state, payload) => ({ ...state, ...payload }))
  .on(setPeriodTariffs, (state, selectedPeriod) => ({
    ...state,
    selectedPeriod,
  }));
