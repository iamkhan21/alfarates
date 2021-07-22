import { RatesService } from "@services/rates";
import { ExchangeOperation } from "./types";
import { MoneyEntity } from "@entities/money";
import { CurrencyRateEntity } from "@entities/currency-rate";

export class ConvertingService {
  private readonly ratesService: RatesService;
  private prevRate: CurrencyRateEntity | null = null;

  constructor(ratesService: RatesService) {
    this.ratesService = ratesService;
  }

  public convert(
    sellIso: string,
    buyIso: string,
    operation: ExchangeOperation,
    amount: MoneyEntity,
    isResultAmount: boolean
  ): MoneyEntity {
    if (sellIso === buyIso) {
      throw Error("Invalid rate pair 'cause buyIso and sellIso are equal");
    }

    const sameCurrencyPair = this.prevRate?.isSameCurrencyPair(sellIso, buyIso);
    const rateEntity = sameCurrencyPair
      ? this.prevRate
      : this.searchRate(sellIso, buyIso);

    if (!rateEntity) {
      console.error("Can't find rate for that pair");
      return MoneyEntity.of(0);
    }

    if (!sameCurrencyPair) this.prevRate = rateEntity;

    const isReversed = this.isRateReversed(sellIso, rateEntity);

    return MoneyEntity.toFormat(
      this.calculateAmount(
        amount,
        rateEntity.rates[operation],
        isReversed,
        isResultAmount
      )
    );
  }

  private calculateAmount(
    amount: MoneyEntity,
    rate: MoneyEntity,
    isReversed: boolean,
    isResultAmount: boolean
  ): MoneyEntity {
    if ((isReversed && isResultAmount) || (!isReversed && !isResultAmount))
      return MoneyEntity.multiply(amount, rate);
    return MoneyEntity.divide(amount, rate);
  }

  private searchRate(
    sellIso: string,
    buyIso: string
  ): CurrencyRateEntity | undefined {
    return this.ratesService.rates.find((rate) =>
      rate.isSameCurrencyPair(sellIso, buyIso)
    );
  }

  private isRateReversed(sellIso: string, rate: CurrencyRateEntity): boolean {
    return rate.sellIso !== sellIso;
  }
}
