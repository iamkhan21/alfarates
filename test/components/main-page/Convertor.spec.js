import Convertor from "@/components/main-page/Convertor";
import { mount } from "@vue/test-utils";
import { divide, formatPrecision, multiply } from "~/utils/currency";
import handledRates from "../../mocks/handled-rates.json";

const rates = handledRates.rates;
const currencies = Object.keys(handledRates.rates);
let wrapper = null;

beforeEach(() => {
  wrapper = mount(Convertor, {
    propsData: {
      rates: handledRates.rates,
    },
  });
});

afterEach(() => {
  wrapper.destroy();
});

describe("Convertor", () => {
  test("is a Vue instance", () => {
    expect(wrapper.vm).toBeTruthy();
  });

  test("should have initial state", () => {
    const buyingCurrency = currencies[0];
    const sellingCurrency = currencies[1];

    // Operation type and currency selectors
    const selectors = wrapper.findAll("select");
    expect(selectors.exists()).toBeTruthy();
    expect(selectors.length).toBe(3);

    const operationList = selectors.at(0);
    expect(operationList.element.value).toBe("buy");
    const operationListHtml = operationList.html();
    expect(operationListHtml).toContain("BUY");
    expect(operationListHtml).toContain("SELL");

    const currencyList1 = selectors.at(1);
    expect(currencyList1.element.value).toBe(buyingCurrency);
    const curList1Html = currencyList1.html();
    currencies.forEach((currency) => expect(curList1Html).toContain(currency));

    const currencyList2 = selectors.at(2);
    expect(currencyList2.element.value).toBe(sellingCurrency);
    const curList2Html = currencyList2.html();
    currencies.forEach((currency) => expect(curList2Html).toContain(currency));

    // Currency amount inputs
    const inputs = wrapper.findAll("input");
    expect(inputs.exists()).toBeTruthy();
    expect(inputs.length).toBe(2);

    const input1 = inputs.at(0);
    expect(+input1.element.value).toBe(1);

    const input2 = inputs.at(1);
    expect(+input2.element.value).toBe(
      formatPrecision(rates[buyingCurrency][sellingCurrency].buy)
    );
  });

  test("should change currency rate on selecting operation type", async () => {
    const opType = "sell";
    const buyingCurrency = currencies[0];
    const sellingCurrency = currencies[1];
    let buyingAmount, sellingAmount, operationType;

    const selectors = wrapper.findAll("select");
    const operationList = selectors.at(0);

    await operationList.findAll("option").at(1).setSelected();
    ({ sellingAmount, operationType } = wrapper.vm);
    expect(operationType).toBe(opType);
    expect(sellingAmount).toBe(
      rates[buyingCurrency][sellingCurrency][operationType]
    );

    await wrapper.setData({ activeInput: 1 });
    ({ buyingAmount, sellingAmount } = wrapper.vm);
    expect(buyingAmount).toBe(
      divide(
        sellingAmount,
        rates[buyingCurrency][sellingCurrency][operationType]
      )
    );
  });

  test("should swap and recalculate on currency type select", async () => {
    const buyingCurrency = currencies[0];
    const sellingCurrency = currencies[1];
    let sellingAmount, operationType;

    const selectors = wrapper.findAll("select");
    const currencyList1 = selectors.at(1);
    const currencyList2 = selectors.at(2);

    // Check currencies swap on gettingCurrency
    await currencyList1.findAll("option").at(1).setSelected();
    expect(currencyList1.element.value).toBe(sellingCurrency);
    expect(currencyList2.element.value).toBe(buyingCurrency);
    ({ sellingAmount, operationType } = wrapper.vm);
    expect(sellingAmount).toBe(
      formatPrecision(rates[sellingCurrency][buyingCurrency][operationType])
    );

    // Check currencies swap on payingCurrency
    await currencyList2.findAll("option").at(1).setSelected();
    expect(currencyList1.element.value).toBe(buyingCurrency);
    expect(currencyList2.element.value).toBe(sellingCurrency);
    ({ sellingAmount, operationType } = wrapper.vm);
    expect(sellingAmount).toBe(
      formatPrecision(rates[buyingCurrency][sellingCurrency][operationType])
    );
  });

  test("should change and recalculate amounts on input", async () => {
    const amount1 = 150;
    const amount2 = 350;
    let buyingAmount,
      sellingCurrency,
      buyingCurrency,
      sellingAmount,
      operationType;

    const inputs = wrapper.findAll("input");
    const input1 = inputs.at(0);
    const input2 = inputs.at(1);

    // Check payingAmount change on input gettingAmount
    await input1.setValue(amount1);
    ({
      buyingAmount,
      sellingAmount,
      operationType,
      sellingCurrency,
      buyingCurrency,
    } = wrapper.vm);

    expect(buyingAmount).toBe(amount1);
    expect(sellingAmount).toBe(
      multiply(rates[buyingCurrency][sellingCurrency][operationType], amount1)
    );

    // Check gettingAmount change on input payingAmount
    await input2.setValue(amount2);
    ({
      buyingAmount,
      sellingAmount,
      operationType,
      sellingCurrency,
      buyingCurrency,
    } = wrapper.vm);

    expect(sellingAmount).toBe(amount2);
    expect(buyingAmount).toBe(
      divide(amount2, rates[buyingCurrency][sellingCurrency][operationType])
    );
  });
});
