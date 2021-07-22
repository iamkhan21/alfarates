import { FunctionalComponent, h } from "preact";
import style from "./style.css";

import { connect } from "unistore/preact";
import { useCallback, useEffect, useState } from "preact/hooks";
import { convertingService, ratesService } from "@services/index";
import { ExchangeOperation } from "@services/converting";
import { MoneyEntity } from "@entities/money";
import CurrencySelector from "@components/main/currency-selector";
import CurrencyInput from "@components/main/currency-input";
import Select from "@components/shared/select";
import { SelectOption } from "@components/shared/select/types";

interface Props {
  isRatesLoaded: boolean;
}

const operations: SelectOption[] = [
  { label: "BUY", value: ExchangeOperation.Buy },
  { label: "SELL", value: ExchangeOperation.Sell },
];

const Converter: FunctionalComponent<Props> = ({ isRatesLoaded }: Props) => {
  const [isResultAmount, setIsResultAmount] = useState(false);
  const [firstAmount, setFirstAmount] = useState<MoneyEntity>(
    MoneyEntity.of(1)
  );
  const [firstCurrency, setFirstCurrency] = useState<string>("USD");
  const [secondAmount, setSecondAmount] = useState<MoneyEntity>(
    MoneyEntity.of(1)
  );
  const [secondCurrency, setSecondCurrency] = useState<string>("BYN");
  const [operation, setOperation] = useState<ExchangeOperation>(
    ExchangeOperation.Sell
  );

  const onSelectOperation = useCallback(
    ({ target: { value } }: any) => setOperation(value),
    []
  );
  const onAmountInput = useCallback(({ value, name }: any) => {
    const amount = MoneyEntity.of(value);
    const isResult = name === "second-amount";

    isResult ? setSecondAmount(amount) : setFirstAmount(amount);
    setIsResultAmount(isResult);
  }, []);

  const onSelectCurrency = useCallback(
    ({ target }: any) => {
      const { name, value } = target;

      switch (name) {
        case "first-currency":
          if (value === secondCurrency) setSecondCurrency(firstCurrency);
          setFirstCurrency(value);
          break;
        case "second-currency":
          if (value === firstCurrency) setSecondCurrency(secondCurrency);
          setSecondCurrency(value);
          break;
      }
    },
    [firstCurrency, secondCurrency]
  );

  useEffect(() => {
    // Currencies initialization on rates loading
    if (isRatesLoaded) {
      const currencies = ratesService.currencies;
      setFirstCurrency(currencies[0]);
      setSecondCurrency(currencies[1]);
    }
  }, [isRatesLoaded]);

  useEffect(() => {
    // Recalculation of exchange amount on states changing for first amount (mean if you would like to use first amount input)
    if (isRatesLoaded && !isResultAmount) {
      const rate = convertingService.convert(
        firstCurrency,
        secondCurrency,
        operation,
        firstAmount,
        isResultAmount
      );
      setSecondAmount(rate);
    }
  }, [
    isRatesLoaded,
    firstCurrency,
    secondCurrency,
    isResultAmount,
    firstAmount,
    operation,
  ]);

  useEffect(() => {
    // Recalculation of exchange amount on states changing for second amount (mean if you would like to use second amount input)
    if (isRatesLoaded && isResultAmount) {
      const rate = convertingService.convert(
        firstCurrency,
        secondCurrency,
        operation,
        secondAmount,
        isResultAmount
      );
      setFirstAmount(rate);
    }
  }, [
    isRatesLoaded,
    firstCurrency,
    secondCurrency,
    isResultAmount,
    secondAmount,
    operation,
  ]);

  return (
    <section className={`siimple-card siimple-card-body ${style.card}`}>
      <div className={style.field}>
        <span>I want to </span>
        <Select
          data={operations}
          value={operation}
          onChange={onSelectOperation}
        />
      </div>
      <div className={style.field}>
        <CurrencyInput
          name="first-amount"
          inputMode="numeric"
          type="text"
          value={firstAmount.amountNum}
          onInput={onAmountInput}
          className='amount-input'
        />
        <CurrencySelector
          name="first-currency"
          value={firstCurrency}
          onChange={onSelectCurrency}
        />
      </div>
      <div className={style['help-text']}>I will {operation === ExchangeOperation.Buy ? "pay" : "get"}</div>
      <div className={style.field}>
        <CurrencyInput
          name="second-amount"
          inputMode="numeric"
          type="text"
          value={secondAmount.amountNum}
          onInput={onAmountInput}
          className='amount-input'

        />

        <CurrencySelector
          name="second-currency"
          value={secondCurrency}
          onChange={onSelectCurrency}
        />
      </div>
    </section>
  );
};

// @ts-ignore
export default connect("isRatesLoaded", undefined)(Converter);
