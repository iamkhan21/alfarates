import { RatesService } from "@services/rates";
import { instance, mock, resetCalls, when } from "ts-mockito";
import { ConvertingService } from "./converting.service";
import { MoneyEntity } from "@entities/money";
import { ExchangeOperation } from "./types";
import { rates } from "../rates-data";

let service: ConvertingService;
let mockedRateService: RatesService;

beforeAll(() => {
  mockedRateService = mock(RatesService);

  when(mockedRateService.rates).thenReturn(rates);

  service = new ConvertingService(instance(mockedRateService));
});

afterEach(() => {
  resetCalls(mockedRateService);
});

describe("ConvertingService", () => {
  const iso1 = "EUR";
  const iso2 = "USD";

  const sumToExchange = MoneyEntity.of(100);

  const buySum1 = MoneyEntity.of(150);
  const buySum2 = MoneyEntity.toFormat(
    MoneyEntity.divide(sumToExchange, MoneyEntity.of(1.5))
  );
  const sellSum1 = MoneyEntity.of(110);
  const sellSumm2 = MoneyEntity.toFormat(
    MoneyEntity.divide(sumToExchange, MoneyEntity.of(1.1))
  );

  test("should do converting buy operation with desirable amount to get", async () => {
    const result = service.convert(
      iso1,
      iso2,
      ExchangeOperation.Buy,
      sumToExchange,
      false
    );
    expect(result).toEqual(buySum1);
  });

  test("should do converting buy operation with desirable amount to spend", async () => {
    const result = service.convert(
      iso1,
      iso2,
      ExchangeOperation.Buy,
      sumToExchange,
      true
    );
    expect(result).toEqual(buySum2);
  });
  test("should do converting buy operation with desirable amount to get and reverse rate", async () => {
    const result = service.convert(
      iso2,
      iso1,
      ExchangeOperation.Buy,
      sumToExchange,
      false
    );
    expect(result).toEqual(buySum2);
  });
  test("should do converting buy operation with desirable amount to spend and reverse rate", async () => {
    const result = service.convert(
      iso2,
      iso1,
      ExchangeOperation.Buy,
      sumToExchange,
      true
    );
    expect(result).toEqual(buySum1);
  });
  test("should do converting sell operation with desirable amount to get", async () => {
    const result = service.convert(
      iso1,
      iso2,
      ExchangeOperation.Sell,
      sumToExchange,
      false
    );
    expect(result).toEqual(sellSum1);
  });
  test("should do converting sell operation with desirable amount to spend", async () => {
    const result = service.convert(
      iso1,
      iso2,
      ExchangeOperation.Sell,
      sumToExchange,
      true
    );
    expect(result).toEqual(sellSumm2);
  });
  test("should do converting sell operation with desirable amount to get and reverse rate", async () => {
    const result = service.convert(
      iso2,
      iso1,
      ExchangeOperation.Sell,
      sumToExchange,
      false
    );
    expect(result).toEqual(sellSumm2);
  });
  test("should do converting sell operation with desirable amount to spend and reverse rate", async () => {
    const result = service.convert(
      iso2,
      iso1,
      ExchangeOperation.Sell,
      sumToExchange,
      true
    );
    expect(result).toEqual(sellSum1);
  });
});
