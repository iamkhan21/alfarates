import { RatesService } from "@services/rates";
import { IndexDb } from "@adapters/browser-storage";
import localforage from "localforage";
import { AlfaBankApi } from "@adapters/bank-api";
import { RestClient } from "@adapters/request-client";
import { ConvertingService } from "@services/converting";

export default class EntrancePoint {
  private static instance: EntrancePoint;
  private readonly _ratesService: RatesService;
  private readonly _convertingService: ConvertingService;

  private constructor() {
    const restClient = new RestClient();
    const storage = new IndexDb(localforage);
    const bankApi = new AlfaBankApi(restClient);
    const ratesService = new RatesService(storage, bankApi);

    this._ratesService = ratesService;
    this._convertingService = new ConvertingService(ratesService);
  }

  get ratesService(): RatesService {
    return this._ratesService;
  }

  get convertingService(): ConvertingService {
    return this._convertingService;
  }

  public static getInstance(): EntrancePoint {
    if (!EntrancePoint.instance) {
      EntrancePoint.instance = new EntrancePoint();
    }

    return EntrancePoint.instance;
  }
}
