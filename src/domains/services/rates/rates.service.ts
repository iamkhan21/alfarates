import { BrowserStorage } from "@adapters/browser-storage";
import { BankApi } from "@adapters/bank-api";
import { CurrencyRateEntity } from "@entities/currency-rate";

const ONE_HOUR = 1 * 60 * 60 * 1000; // Cache timeout

export class RatesService {
  private readonly storage: BrowserStorage;
  private readonly bank: BankApi;

  constructor(storage: BrowserStorage, bank: BankApi) {
    this.storage = storage;
    this.bank = bank;
  }

  private _rates: CurrencyRateEntity[] = [];

  get rates(): CurrencyRateEntity[] {
    return this._rates;
  }

  private _currencies: Set<string> = new Set();

  get currencies(): string[] {
    return Array.from(this._currencies);
  }

  async init(): Promise<void> {
    const { rates, date } = await this.readFromStorage();
    const isCacheInvalid = date + ONE_HOUR < Date.now();

    if (isCacheInvalid) {
      await this.refreshRates();
    } else {
      this.setRatesAndCurrenciesList(rates);
    }
  }

  async refreshRates(): Promise<void> {
    const rates = await this.loadRates();

    this.setRatesAndCurrenciesList(rates);
    this.writeToStorage(rates);
  }

  private loadRates(): Promise<CurrencyRateEntity[]> {
    return this.bank.getRates();
  }

  private setRatesAndCurrenciesList(rates: CurrencyRateEntity[]): void {
    this._rates = rates;

    const currencies: Set<string> = new Set();

    for (const { sellIso, buyIso } of rates) {
      currencies.add(sellIso);
      currencies.add(buyIso);
    }

    this._currencies = currencies;
  }

  private writeToStorage(rates: CurrencyRateEntity[]) {
    this.storage.write(
      "rates",
      JSON.stringify({
        rates: rates.map(CurrencyRateEntity.toMap),
        date: Date.now(),
      })
    );
  }

  private async readFromStorage(): Promise<{
    rates: CurrencyRateEntity[];
    date: number;
  }> {
    const result = await this.storage.read("rates");
    const { rates = [], date } =
      typeof result === "string" ? JSON.parse(result) : { rates: [], date: 0 };
    return { rates: rates.map(CurrencyRateEntity.fromMap), date };
  }
}
