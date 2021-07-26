import { RequestClient } from "./types";
import greenlet from "greenlet";

const getWorker = greenlet(async (url: string) => {
  const res = await fetch(url);
  return await res.json();
});

export class RestClient implements RequestClient {
  get(url: string): Promise<any> {
    return getWorker(url);
  }
}
