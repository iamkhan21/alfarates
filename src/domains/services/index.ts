import { RatesService } from "@services/rates";
import { IndexDb } from "@adapters/browser-storage";
import localforage from "localforage";
import { AlfaBankApi } from "@adapters/bank-api";
import { RestClient } from "@adapters/request-client";
import { ConvertingService } from "@services/converting";

const restClient = new RestClient();
const storage = new IndexDb(localforage);
const bankApi = new AlfaBankApi(restClient);

export const ratesService = new RatesService(storage, bankApi);
export const convertingService = new ConvertingService(ratesService);
