import { h } from "preact";
import Converter from "@components/main/converter";
import EntrancePoint from "@services/index";
import { ServicesContext } from "../src/contexts";
import { instance, mock, when } from "ts-mockito";
import { RatesService } from "@services/rates";
import { ConvertingService, ExchangeOperation } from "@services/converting";
import { rates } from "@services/rates-data";
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/preact";
import "@testing-library/jest-dom/extend-expect";
import { MoneyEntity } from "@entities/money";

jest.mock("@adapters/request-client");

const currencies = ["EUR", "USD", "BYN"];

afterEach(cleanup);

beforeEach(() => {
  const mockedRatesService = mock(RatesService);
  when(mockedRatesService.rates).thenReturn(rates);

  when(mockedRatesService.currencies).thenReturn(currencies);

  const ratesService = instance(mockedRatesService);
  const convertingService = new ConvertingService(ratesService);

  const mockedEntrancePoint = mock(EntrancePoint);
  when(mockedEntrancePoint.ratesService).thenReturn(ratesService);
  when(mockedEntrancePoint.convertingService).thenReturn(convertingService);
  const entrancePoint = instance(mockedEntrancePoint);

  render(
    <ServicesContext.Provider value={entrancePoint}>
      <Converter />
    </ServicesContext.Provider>
  );
});

describe("Converter", () => {
  test("should load rates on initializing", async () => {
    const selectors = screen.getAllByTestId("select");
    const inputs = screen.getAllByTestId("input");

    await waitFor(() => {
      expect(selectors[0]).toHaveValue(ExchangeOperation.Sell);
      expect(selectors[1]).toHaveValue(currencies[0]);
      expect(selectors[2]).toHaveValue(currencies[1]);
      expect(inputs[0]).toHaveValue("1");
      expect(inputs[1]).toHaveValue(rates[2].sellRate.amount.valueOf());
    });
  });
  it("should swap currency types in selector", async () => {
    const selectors = screen.getAllByTestId("select");

    fireEvent.change(selectors[1], { target: { value: currencies[1] } });

    await waitFor(() => {
      expect(selectors[1]).toHaveValue(currencies[1]);
      expect(selectors[2]).toHaveValue(currencies[0]);
    });

    await act(() => {
      fireEvent.change(selectors[2], { target: { value: currencies[1] } });
    });

    await waitFor(() => {
      expect(selectors[1]).toHaveValue(currencies[0]);
      expect(selectors[2]).toHaveValue(currencies[1]);
    });
  });
  it("should recalculate amount on currency change", async () => {
    const selectors = screen.getAllByTestId("select");
    const inputs = screen.getAllByTestId("input");

    fireEvent.change(selectors[2], { target: { value: currencies[2] } });

    await waitFor(() => {
      expect(selectors[2]).toHaveValue(currencies[2]);
      expect(inputs[1]).toHaveValue(rates[1].sellRate.amount.valueOf());
    });

    fireEvent.change(selectors[1], { target: { value: currencies[1] } });

    await waitFor(() => {
      expect(selectors[1]).toHaveValue(currencies[1]);
      expect(inputs[1]).toHaveValue(rates[0].sellRate.amount.valueOf());
    });
  });
  it("should recalculate on change operation type", async () => {
    const selector = screen.getAllByTestId("select")[0];
    const input = screen.getAllByTestId("input")[1];

    fireEvent.change(selector, {
      target: { value: ExchangeOperation.Buy },
    });

    await waitFor(() => {
      expect(input).toHaveValue(rates[2].buyRate.amount.valueOf());
    });
  });
  test("should calculate rates", async () => {
    const selectors = screen.getAllByTestId("select");
    const inputs = screen.getAllByTestId("input");

    const amount = 100;

    fireEvent.input(inputs[0], { target: { value: amount } });

    await waitFor(() => {
      const sum = MoneyEntity.multiply(
        rates[2].sellRate,
        MoneyEntity.of(amount)
      ).amount.valueOf();
      expect(inputs[1]).toHaveValue(sum);
    });

    fireEvent.input(inputs[1], { target: { value: amount } });

    await waitFor(() => {
      const sum = MoneyEntity.divide(
        MoneyEntity.of(amount),
        rates[2].sellRate
      ).amount.valueOf();

      expect(inputs[0]).toHaveValue(sum);
    });
  });
});
