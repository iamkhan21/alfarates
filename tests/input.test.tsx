import { h } from "preact";
import Input from "@components/shared/input";
import { cleanup, fireEvent, render, screen } from "@testing-library/preact";
import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup);

describe("Input", () => {
  it("should render input HTML element in document", () => {
    render(<Input value={10} />);

    expect(screen.getByTestId("input")).toBeInTheDocument();
  });
  test("should use value from props", () => {
    const value = "10";
    render(<Input value={value} />);

    const input = screen.getByTestId("input");
    expect(input).toHaveValue(value);
  });
  test("should change value on input", () => {
    let testValue = 30;

    const wrapper = render(
      <Input
        value={testValue}
        onInput={(e: any) => {
          testValue = e.target.value;
        }}
      />
    );
    const input = screen.getByTestId("input");

    const newValue = "1234";
    fireEvent.input(input, { target: { value: newValue } });

    expect(input).toHaveValue(newValue);
    expect(testValue).toEqual(newValue);
  });

  test("should use element attributes from props", () => {
    const name = "test";

    render(
      <Input
        id={name}
        className={name}
        name={name}
        type="number"
        inputMode="numeric"
      />
    );
    const input = screen.getByTestId("input");

    expect(input).toHaveClass(name);
    expect(input).toHaveAttribute("id", name);
    expect(input).toHaveAttribute("name", name);
    expect(input).toHaveAttribute("type", "number");
    expect(input).toHaveAttribute("inputMode", "numeric");
  });
});
