import { anyString, anything, instance, mock, reset, when } from "ts-mockito";
import { IndexDb } from "@adapters/browser-storage/index";

const key = "test";
const value = 3;

let mockedIndexDB: IndexDb;

beforeAll(() => {
  mockedIndexDB = mock(IndexDb);
});

afterEach(() => {
  reset(mockedIndexDB);
});

describe("Storage", () => {
  test("IndexDB read", async () => {
    when(mockedIndexDB.read(anyString())).thenResolve(value);
    const indexDB: IndexDb = instance(mockedIndexDB);

    expect(await indexDB.read(key)).toBe(value);
  });
  test("IndexDB write", async () => {
    when(mockedIndexDB.write(anyString(), anything())).thenResolve(true);
    const indexDB: IndexDb = instance(mockedIndexDB);

    expect(await indexDB.write(key, value)).toBeTruthy();
  });
});
