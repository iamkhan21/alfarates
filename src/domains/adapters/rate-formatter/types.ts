import { CurrencyRateEntity } from "@entities/currency-rate";

export abstract class RateFormatter {
  static format(bankRate: any[]): CurrencyRateEntity[] {
    return bankRate.map((item) => item);
  }
}
