import { MoneyEntity } from "../money";

export type CurrencyRate = {
  sellIso: string;
  buyIso: string;
  sellRate: MoneyEntity;
  buyRate: MoneyEntity;
};

export type RawCurrencyRate = {
  sellIso: string;
  buyIso: string;
  sellRate: number;
  buyRate: number;
};

export type Rates = {
  sell: MoneyEntity;
  buy: MoneyEntity;
};
