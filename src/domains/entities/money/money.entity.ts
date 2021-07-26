import { BigNumber } from "bignumber.js";

export class MoneyEntity {
  private readonly _amount: BigNumber;

  constructor(amount: BigNumber) {
    this._amount = amount;
  }

  get amount(): BigNumber {
    return this._amount;
  }

  get amountNum(): number {
    return this._amount.toNumber();
  }

  static of(value: number): MoneyEntity {
    return new MoneyEntity(new BigNumber(value));
  }

  static divide(a: MoneyEntity, b: MoneyEntity): MoneyEntity {
    return MoneyEntity.of(+a.amount.dividedBy(b.amount).toFixed(2));
  }

  static multiply(a: MoneyEntity, b: MoneyEntity): MoneyEntity {
    return MoneyEntity.of(+a.amount.multipliedBy(b.amount).toFixed(2));
  }

  static toFormat(a: MoneyEntity): MoneyEntity {
    return MoneyEntity.of(+a.amount.toFixed(2));
  }
}
