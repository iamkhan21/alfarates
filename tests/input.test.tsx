import { h } from "preact";
import Input from "@components/shared/input";
// See: https://github.com/preactjs/enzyme-adapter-preact-pure
import { mount, shallow } from "enzyme";

describe("Input", () => {
  test("should contain input element", () => {
    const wrapper = shallow(<Input />);
    const input = wrapper.find("input");
    expect(input).toBeTruthy();
  });
  test("should use value from props", () => {
    const value = 10;
    const wrapper = shallow(<Input value={value} />);
    const input = wrapper.find("input");
    expect(input.prop("value")).toEqual(value);
  });
  test("should change value on input", () => {
    let testValue = 30;

    const wrapper = mount(
      <Input
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

    const wrapper = shallow(
      <Input
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
