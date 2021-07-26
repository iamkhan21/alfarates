import { h } from "preact";
import Select from "@components/shared/select";
import { SelectOption } from "@components/shared/select/types";
import { cleanup, fireEvent, render, screen } from "@testing-library/preact";
import "@testing-library/jest-dom/extend-expect";

const data: SelectOption[] = [
  { value: "USD", label: "USD" },
  { value: "BYN", label: "BYN" },
  { value: "EUR", label: "EUR" },
];
const value = "USD";
const onChange = jest.fn();

afterEach(cleanup);

describe("Select", () => {
  test("should use data from props", () => {
    const { container } = render(
      <Select data={data} value={value} onChange={onChange} />
    );
    const select = screen.getByTestId("select");
    const options = screen.getAllByTestId("option");

    expect(select).toHaveValue(value);
    expect(options[2]).toHaveValue("EUR");
  });
  test("should change value on select", () => {
    let testValue: string = value;

    render(
      <Select
        data={data}
        value={testValue}
        onChange={(e: any) => {
          testValue = e.target.value;
        }}
      />
    );

    const select = screen.getByTestId("select");

    fireEvent.change(select, { target: { value: "EUR" } });

    expect(testValue).toEqual("EUR");
  });

  test("should use element attributes from props", () => {
    const name = "test";

    render(
      <Select
        id={name}
        className={name}
        name={name}
        type="number"
        inputMode="numeric"
      />
    );
    const select = screen.getByTestId("select");

    expect(select).toHaveClass(name);
    expect(select).toHaveAttribute("id", name);
    expect(select).toHaveAttribute("name", name);
  });
});
