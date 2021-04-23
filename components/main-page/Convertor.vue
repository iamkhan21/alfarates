<template>
  <section class="card">
    <form>
      <div class="form-title">
        <h2 class="is-size-3">I'D LIKE TO</h2>
        <b-select v-model="operationType">
          <option value="buy">BUY</option>
          <option value="sell">SELL</option>
        </b-select>
      </div>

      <div class="form-field">
        <b-field>
          <b-input
            inputmode="numeric"
            :value="gettingAmount"
            @input="inputAmount('gettingAmount', $event)"
          />
        </b-field>

        <b-select
          :value="gettingCurrency"
          @input="swapCurrencies('gettingCurrency', $event)"
        >
          <option
            v-for="currency in currencies"
            :key="currency"
            :value="currency"
          >
            {{ currency }}
          </option>
        </b-select>
      </div>
      <div class="form-field">
        <b-field :label="label">
          <b-input
            inputmode="numeric"
            :value="payingAmount"
            @input="inputAmount('payingAmount', $event)"
          />
        </b-field>
        <b-select
          :value="payingCurrency"
          @input="swapCurrencies('payingCurrency', $event)"
        >
          <option
            v-for="currency in currencies"
            :key="currency"
            :value="currency"
          >
            {{ currency }}
          </option>
        </b-select>
      </div>
    </form>
  </section>
</template>

<script>
import { divide, formatToHumanReadable, multiply } from "~/utils/currency";

const labelTexts = { buy: "I'll need to pay", sell: "I'll get" };

export default {
  name: "Convertor",
  props: {
    rates: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      operationType: "buy",
      gettingCurrency: "USD",
      payingCurrency: "BYN",
      gettingAmount: 1,
      payingAmount: 1,
      activePayingInput: false,
      // activePayingInput needed in order to track main user amount
    };
  },
  watch: {
    operationType() {
      this.recalculateAmounts();
    },
    gettingCurrency() {
      this.recalculateAmounts();
    },
    payingCurrency() {
      this.recalculateAmounts();
    },
  },
  computed: {
    currencies() {
      return Object.keys(this.rates || {});
    },
    rate() {
      return (
        this.rates[this.gettingCurrency][this.payingCurrency][
          this.operationType
        ] || 1
      );
    },
    label() {
      return labelTexts[this.operationType];
    },
  },
  methods: {
    inputAmount(type, amount) {
      this.activePayingInput = type === "payingAmount";
      this[type] = formatToHumanReadable(amount);
      this.recalculateAmounts();
    },
    recalculateAmounts() {
      if (this.activePayingInput) {
        const amount = divide(this.payingAmount, this.rate);
        this.gettingAmount = formatToHumanReadable(amount);
      } else {
        const amount = multiply(this.gettingAmount, this.rate);
        this.payingAmount = formatToHumanReadable(amount);
      }
    },
    swapCurrencies(currencyVar, type) {
      if (currencyVar === "gettingCurrency") {
        if (this.payingCurrency === type) {
          this.payingCurrency = this[currencyVar];
        }
      } else {
        if (this.gettingCurrency === type) {
          this.gettingCurrency = this[currencyVar];
        }
      }

      this[currencyVar] = type;
    },
  },
  mounted() {
    this.recalculateAmounts();
  },
};
</script>

<style scoped lang="scss">
.card {
  padding: 25px;
  width: 100%;
  max-width: 550px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  background-color: #ffffff;
}

.field {
  margin-bottom: 0;
}

.form-title,
.form-field {
  grid-column-gap: 15px;
  grid-template-columns: 1fr 110px;
}

.form-title {
  display: inline-grid;
  align-items: center;
  margin-bottom: 20px;
}

.form-field {
  display: grid;
  align-items: flex-end;

  input {
    text-align: right;
  }

  & + .form-field {
    margin-top: 15px;
  }
}
</style>
