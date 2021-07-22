import { h } from "preact";
// See: https://github.com/preactjs/enzyme-adapter-preact-pure
import { mount, shallow } from "enzyme";
import CurrencyInput from "@components/main/currency-input";

describe("CurrencyInput", () => {
  test("should contain input element", () => {
    const wrapper = mount(<CurrencyInput />);
    const input = wrapper.find("input");
    expect(input).toBeTruthy();
  });
  test("should use value from props", () => {
    const value = '10';
    const wrapper = mount(<CurrencyInput value={value} />);
    const input = wrapper.find("input");
    expect(input.prop("value")).toEqual(value);
  });
  test("should change value on input", () => {
    let testValue = 30;

    const wrapper = mount(
      <CurrencyInput
        value={testValue}
        onChange={(e: any) => {
          testValue = +e.target.value;
        }}
      />
    );
    const input = wrapper.find("input");
    input.getDOMNode().value = "123";
    input.simulate("change");

    expect(testValue).toEqual(123);
  });

  test("should use element attributes from props", () => {
    const name = "test";

    const wrapper = mount(
      <CurrencyInput
        id={name}
        className={name}
        name={name}
        type="number"
        inputMode="numeric"
      />
    );
    const input = wrapper.find("input");

    expect(input.prop("className")).toContain(name);
    expect(input.prop("id")).toEqual(name);
    expect(input.prop("name")).toEqual(name);
    expect(input.prop("type")).toEqual("number");
    expect(input.prop("inputMode")).toEqual("numeric");
  });
});
