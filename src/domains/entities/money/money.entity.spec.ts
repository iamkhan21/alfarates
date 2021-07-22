import { MoneyEntity } from "./money.entity";
import BigNumber from "bignumber.js";

describe("MoneyEntity", () => {
  test("Multiplication", () => {
    const num1 = 1000;
    const num2 = 123.41;

    const result = MoneyEntity.multiply(
      MoneyEntity.of(num1),
      MoneyEntity.of(num2)
    );

    const a = new BigNumber(num1);
    const b = new BigNumber(num2);

    expect(result.amount).toEqual(a.multipliedBy(b));
  });
  test("Format", () => {
    const num = 123532.41123;

    const result = MoneyEntity.toFormat(MoneyEntity.of(num));

    const a = new BigNumber(num);

    const fixed = new BigNumber(a.toFixed(2));
    expect(result.amount).toEqual(fixed);
  });
});
