export type StorageValue = string | number | null | undefined;

export type ThirdPartyStorageController = {
  setItem: (key: string, value: StorageValue) => Promise<StorageValue>;
  getItem: (key: string) => Promise<StorageValue>;
};

export interface BrowserStorage {
  read(key: string): Promise<StorageValue | null>;

  write(key: string, value: StorageValue): Promise<boolean>;
}
