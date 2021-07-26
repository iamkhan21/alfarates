import { FunctionalComponent, h } from "preact";
import { SelectOption } from "@components/shared/select/types";



const Select: FunctionalComponent<any> = ({
  data = [],
  className,
  ...props
}: any) => {
  return (
    <select
      data-testid="select"
      {...props}
      className={`${className} siimple-select`}
    >
      {data.map(({ label, value }: SelectOption) => (
        <option data-testid="option" key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};

export default Select;
