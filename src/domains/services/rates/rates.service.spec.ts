import {
  anyString,
  anything,
  instance,
  mock,
  resetCalls,
  spy,
  verify,
  when,
} from "ts-mockito";
import { RatesService } from "./rates.service";
import { CurrencyRateEntity } from "@entities/currency-rate";
import { MoneyEntity } from "@entities/money";
import { BrowserStorage } from "@adapters/browser-storage";
import { BankApi } from "@adapters/bank-api";

const rates: CurrencyRateEntity[] = [
  CurrencyRateEntity.of({
    sellRate: MoneyEntity.of(2.39),
    sellIso: "USD",
    buyRate: MoneyEntity.of(2.54),
    buyIso: "BYN",
  }),
  CurrencyRateEntity.of({
    sellRate: MoneyEntity.of(3.39),
    sellIso: "EUR",
    buyRate: MoneyEntity.of(3.54),
    buyIso: "BYN",
  }),
  CurrencyRateEntity.of({
    sellRate: MoneyEntity.of(1.1),
    sellIso: "EUR",
    buyRate: MoneyEntity.of(1.3),
    buyIso: "USD",
  }),
];

let service: RatesService;
let mockedStorage: BrowserStorage;
let mockedBankApi: BankApi;

beforeAll(() => {
  mockedStorage = mock<BrowserStorage>();
  mockedBankApi = mock<BankApi>();

  when(mockedBankApi.getRates()).thenResolve(rates);
  when(mockedStorage.read(anyString())).thenResolve(undefined);

  service = new RatesService(instance(mockedStorage), instance(mockedBankApi));
});

afterEach(() => {
  resetCalls(mockedStorage);
  resetCalls(mockedBankApi);
});

describe("RatesService", () => {
  test("should initialize with rates and list of currencies", async () => {
    await service.init();

    verify(mockedStorage.read(anything())).once();
    verify(mockedStorage.write(anything(), anything())).once();
    expect(service.rates).toEqual(rates);
    expect(service.currencies.sort()).toEqual(["USD", "EUR", "BYN"].sort());
  });
  test("should refresh rates", async () => {
    const spiedService = spy(service);

    await service.refreshRates();

    verify(spiedService.refreshRates()).once();
    verify(mockedStorage.write(anything(), anything())).once();
    expect(service.rates).toEqual(rates);
  });
});
