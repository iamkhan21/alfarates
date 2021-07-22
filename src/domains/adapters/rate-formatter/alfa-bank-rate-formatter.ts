import { RateFormatter } from "./types";
import { CurrencyRateEntity } from "@entities/currency-rate";
import { AlfaBankRate } from "@adapters/bank-api";
import { MoneyEntity } from "@entities/money";

export class AlfaBankRateFormatter extends RateFormatter {
  static format(bankRate: AlfaBankRate[]): CurrencyRateEntity[] {
    return bankRate.map(({ sellRate, sellIso, buyRate, buyIso, quantity }) =>
      CurrencyRateEntity.of({
        sellIso,
        buyIso,
        sellRate: MoneyEntity.divide(
          MoneyEntity.of(sellRate),
          MoneyEntity.of(quantity)
        ),
        buyRate: MoneyEntity.divide(
          MoneyEntity.of(buyRate),
          MoneyEntity.of(quantity)
        ),
      })
    );
  }
}
