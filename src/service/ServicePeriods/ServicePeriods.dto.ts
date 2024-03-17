export interface Period {
  id: string;
  month: number;
  contents: PeriodContent[];
}

export interface PeriodContent {
  code: string;
  text: string;
}
