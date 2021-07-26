import {CurrencyRateEntity} from "@entities/currency-rate";
import {MoneyEntity} from "@entities/money";

export const rates: CurrencyRateEntity[] = [
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
        buyRate: MoneyEntity.of(1.5),
        buyIso: "USD",
    }),
];
