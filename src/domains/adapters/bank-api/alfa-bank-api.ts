import { BankApi } from "./types";
import { RequestClient } from "../request-client";
import { AlfaBankRateFormatter } from "@adapters/rate-formatter";
import { CurrencyRateEntity } from "@entities/currency-rate";

const bankServer = `https://developerhub.alfabank.by:8273/partner/1.0.1`;

const URLS = {
  RATES: `${bankServer}/public/rates`,
};

export type AlfaBankRate = {
  sellRate: number;
  sellIso: string;
  sellCode: number;
  buyRate: number;
  buyIso: string;
  buyCode: number;
  quantity: number;
  name: string;
  date: string;
};

export class AlfaBankApi implements BankApi {
  private readonly client: RequestClient;

  constructor(client: RequestClient) {
    this.client = client;
  }

  getRates(): Promise<CurrencyRateEntity[]> {
    return this.client
      .get(URLS.RATES)
      .catch((err) => {
        console.error(`Can't fetch AlfaBank currency rates. Error: ${err}`);
        return { rates: [] };
      })
      .then(({ rates }) => AlfaBankRateFormatter.format(rates));
  }
}
