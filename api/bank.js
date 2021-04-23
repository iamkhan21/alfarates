import { of } from "await-of";
import axios from "axios";
import { formatPrecision } from "@/utils/currency";

function mapRates(rates) {
  const result = {};

  for (let { buyRate, buyIso, sellRate, sellIso, quantity } of rates) {
    sellRate = sellRate / quantity;
    buyRate = buyRate / quantity;

    if (!result[sellIso]) result[sellIso] = {};
    result[sellIso][buyIso] = {
      sell: sellRate,
      buy: buyRate,
    };

    if (!result[buyIso]) result[buyIso] = {};
    const sell = formatPrecision(1 / sellRate, 5);
    const buy = formatPrecision(1 / buyRate, 5);

    result[buyIso][sellIso] = {
      sell,
      buy,
    };
  }

  return result;
}

// let ratesCache = { date: null, rates: {}, time: null };
// const halfHour = 30 * 60 * 1000;

/**
 *
 * @param {Object} params
 * @param {URLSearchParams} params.query - request query
 * @param {Object} params.body - request body object
 * @return {Promise<*>}
 */
async function getRates({ query, body } = {}) {
  let [res, err] = await of(
    axios.get(
      "https://developerhub.alfabank.by:8273/partner/1.0.1/public/rates"
    )
  );

  if (err) {
    // rethrow if its not an axios response error
    if (!err.response) {
      throw err;
    }

    throw Error(err.response?.data);
  }

  const { rates } = res.data;
  const date = rates[0]?.date;
  const mappedRates = mapRates(rates);

  return {
    date,
    rates: mappedRates,
  };
}

export { getRates as rates };
