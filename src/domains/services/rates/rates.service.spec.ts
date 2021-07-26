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
import { BrowserStorage } from "@adapters/browser-storage";
import { BankApi } from "@adapters/bank-api";
import { rates } from "@services/rates-data";

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
