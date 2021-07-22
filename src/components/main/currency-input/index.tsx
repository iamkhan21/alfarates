import { FunctionalComponent, h } from "preact";
import Input from "@components/shared/input";
import { useCallback, useEffect, useState } from "preact/hooks";
import { BigNumber } from "bignumber.js";

const fmt = {
  decimalSeparator: ".",
  groupSeparator: " ",
  groupSize: 3,
  secondaryGroupSize: 3,
};

const CurrencyInput: FunctionalComponent = ({ value, onInput, ...props }:any) => {
  const [amount, setAmount] = useState(value);

  const onAmountInput = useCallback(({ target: { value, name } }: any) => {
    onInput({ value: value.replace(" ", ""), name });
  }, []);

  useEffect(() => {
    setAmount(new BigNumber(value).toFormat(fmt));
  }, [value]);

  return (
    <Input
      value={amount}
      onInput={onAmountInput}
      autoComplete="off"
      {...props}
    />
  );
};

export default CurrencyInput;
