import currency from "currency.js";

export function formatPrecision(sum, precision = 2) {
  return currency(sum, { precision }).value;
}

export function multiply(num1, num2) {
  return currency(num1).multiply(num2).value;
}

export function divide(num1, num2) {
  return currency(num1).divide(num2).value;
}

export function formatToHumanReadable(amount) {
  const cents = currency(amount).cents();

  let precision = 0;

  if (cents) precision = cents % 10 ? 2 : 1;

  return currency(amount, { precision, symbol: "", separator: " " }).format();
}
