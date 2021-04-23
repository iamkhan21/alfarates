import axios from "axios";
import ratesMock from "../mocks/raw-rates.json";
import handledMock from "../mocks/handled-rates.json";

import { rates } from "~/api/bank";

jest.mock("axios");

describe("Bank API", () => {
  it("fetches successfully data from an API", async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve(ratesMock));

    const response = await rates();

    expect(response).toEqual(handledMock);
  });

  it("fetches erroneously data from an API", async () => {
    const errorMessage = "Network Error";

    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );

    await expect(rates()).rejects.toThrow(errorMessage);
  });
});
