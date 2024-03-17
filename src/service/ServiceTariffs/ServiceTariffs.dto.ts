export interface GetTariffsByPeriodParams {
  id: string;
}

export interface TariffPrice {
  crated: string;
  price: number;
}

export interface Tariff {
  id: string;
  createdAt: string;
  mnemonic: string;
  sections: TariffSection[];
  price: TariffPrice;
  permissions: TariffPermission[];
}

export interface TariffSection {
  mnemonic: "Description" | "Name";
  contents: TariffSectionContent[];
}

export interface TariffSectionContent {
  code: string;
  text: string;
}

export interface TariffPermission {
  permissionId: string;
  limit: number;
  contents: TariffPermissionContent[];
}

export interface TariffPermissionContent {
  code: string;
  text: string;
}
