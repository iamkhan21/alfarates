import { RequestClient } from "./types";
import greenlet from "greenlet";

export class RestClient implements RequestClient {
  getWorker = greenlet(async (url: string) => {
    const res = await fetch(url);
    return await res.json();
  });

  get(url: string): Promise<any> {
    return this.getWorker(url);
  }
}
