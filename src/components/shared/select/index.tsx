import { FunctionalComponent, h } from "preact";
import {SelectOption} from "@components/shared/select/types";

const Select: FunctionalComponent = ({ data, ...props }: any) => {
  return (
    <select {...props}  class="siimple-select">
      {data.map(({ label, value }: SelectOption) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};

export default Select;
