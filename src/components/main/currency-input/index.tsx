import { FunctionalComponent, h } from "preact";
import Input from "@components/shared/input";
import { useCallback, useLayoutEffect, useState } from "preact/hooks";
import { BigNumber } from "bignumber.js";

const fmt = {
  decimalSeparator: ".",
  groupSeparator: " ",
  groupSize: 3,
  secondaryGroupSize: 3,
};

const CurrencyInput: FunctionalComponent<any> = ({
  value,
  onInput,
  ...props
}: any) => {
  const [amount, setAmount] = useState(value);

  const onAmountInput = useCallback(({ target: { value, name } }: any) => {
    onInput({ value: value.replace(" ", ""), name });
  }, []);

  useLayoutEffect(() => {
    const format = new BigNumber(value).toFormat(fmt);
    setAmount(format);
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
