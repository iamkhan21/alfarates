import { FunctionalComponent, h } from "preact";

const Input: FunctionalComponent<any> = ({ className, ...props }: any) => {
  return <input data-testid="input" className={`siimple-input ${className}`} {...props} />;
};

export default Input;
