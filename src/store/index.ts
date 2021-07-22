import createStore, { Store } from "unistore";
import { ratesService } from "@services/index";

export type AppStore = { isRatesLoaded: boolean };

export const store = createStore<AppStore>({ isRatesLoaded: false });


export const actions = (store: Store<AppStore>) => ({
  async loadRates() {
      store.setState({ isRatesLoaded: false });
    await ratesService.init();
    return { isRatesLoaded: true };
  },
});
