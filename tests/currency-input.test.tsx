import { h } from "preact";
import CurrencyInput from "@components/main/currency-input";
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/preact";
import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup);

const onInput = jest.fn();

describe("CurrencyInput", () => {
  it("should render input HTML element in document", () => {
    render(<CurrencyInput value={10} onInput={onInput} />);
    expect(screen.getByTestId("input")).toBeInTheDocument();
  });
  test("should use value from props", () => {
    const value = "12300";
    render(<CurrencyInput value={value} onInput={() => {}} />);
    const input = screen.getByTestId("input");

    expect(input).toHaveValue("12 300");
  });

  test("should change value on input", async () => {
    let testValue = "30";

    const onInput = ({ value }: any) => {
      testValue = value;
    };

    const { rerender } = render(
      <CurrencyInput value={testValue} onInput={onInput} />
    );

    const input = screen.getByTestId("input");

    const newValue = "12340";
    fireEvent.input(input, { target: { value: newValue } });

    rerender(<CurrencyInput value={testValue} onInput={onInput} />);

    await waitFor(() => {
      expect(testValue).toEqual(newValue);
      expect(input).toHaveValue("12 340");
    });
  });
  test("should use element attributes from props", () => {
    const name = "test";

    render(
      <CurrencyInput
        id={name}
        className={name}
        name={name}
        type="number"
        inputMode="numeric"
        value={10}
        onInput={onInput}
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
