import { h } from "preact";
import Header from "@components/core/header";
import { cleanup, render } from "@testing-library/preact";
import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup);

describe("Header", () => {
  test("should have brand label", () => {
    const { container } = render(<Header />);
    expect(container).toHaveTextContent("Rately");
  });
});
