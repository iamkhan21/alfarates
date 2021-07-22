import { MoneyEntity } from "../money";
import { CurrencyRate, Rates, RawCurrencyRate } from "./types";
import { ExchangeOperation } from "@services/converting";

export class CurrencyRateEntity {
  private readonly _sellIso: string;
  private readonly _buyIso: string;
  private readonly _sellRate: MoneyEntity;
  private readonly _buyRate: MoneyEntity;

  constructor(
    sellIso: string,
    buyIso: string,
    sellRate: MoneyEntity,
    buyRate: MoneyEntity
  ) {
    this._sellIso = sellIso;
    this._buyIso = buyIso;
    this._sellRate = sellRate;
    this._buyRate = buyRate;
  }

  get sellIso(): string {
    return this._sellIso;
  }

  get buyIso(): string {
    return this._buyIso;
  }

  get sellRate(): MoneyEntity {
    return this._sellRate;
  }

  get buyRate(): MoneyEntity {
    return this._buyRate;
  }

  get rates(): Rates {
    return {
      [ExchangeOperation.Sell]: this._sellRate,
      [ExchangeOperation.Buy]: this._buyRate,
    };
  }

  static of({
    sellIso,
    sellRate,
    buyIso,
    buyRate,
  }: CurrencyRate): CurrencyRateEntity {
    if (sellIso === buyIso) {
      throw Error(
        "sellIso and buyIso are same. sellIso and buyIso should be different"
      );
    }

    return new CurrencyRateEntity(sellIso, buyIso, sellRate, buyRate);
  }

  static fromMap(rate: RawCurrencyRate): CurrencyRateEntity {
    return new CurrencyRateEntity(
      rate.sellIso,
      rate.buyIso,
      MoneyEntity.of(rate.sellRate),
      MoneyEntity.of(rate.buyRate)
    );
  }

  static toMap(rate: CurrencyRateEntity): RawCurrencyRate {
    return {
      sellRate: rate.sellRate.amountNum,
      buyRate: rate.buyRate.amountNum,
      sellIso: rate.sellIso,
      buyIso: rate.buyIso,
    };
  }

  isSameCurrencyPair(sellIso: string, buyIso: string): boolean {
    const a = sellIso === this._sellIso && buyIso === this._buyIso;
    const b = buyIso === this._sellIso && sellIso === this._buyIso;
    return a ? !b : b; // Here I use logical XOR (exclusive OR) to exclude situation when someone send same currency as sellIso and buyIso
  }
}
