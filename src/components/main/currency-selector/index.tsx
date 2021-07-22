import { FunctionalComponent, h } from "preact";
import { connect } from "unistore/preact";
import { useEffect, useState } from "preact/hooks";
import { ratesService } from "@services/index";
import Select from "@components/shared/select";
import { SelectOption } from "@components/shared/select/types";

interface Props {
  name: string;
  value: string;
  isRatesLoaded: boolean;
  onChange: () => any;
}

const CurrencySelector: FunctionalComponent<Props> = ({
  isRatesLoaded,
  ...props
}: Props) => {
  const [currencies, setCurrencies] = useState<SelectOption[]>([]);

  useEffect(() => {
    if (isRatesLoaded) {
      const list = ratesService.currencies.map(
        (currency): SelectOption => ({
          label: currency,
          value: currency,
        })
      );
      setCurrencies(list);
    }
  }, [isRatesLoaded]);

  return <Select data={currencies} {...props} />;
};

// @ts-ignore
export default connect("isRatesLoaded", null)(CurrencySelector);
