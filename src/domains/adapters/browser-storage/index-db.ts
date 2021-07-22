import {
  BrowserStorage,
  StorageValue,
  ThirdPartyStorageController,
} from "./types";

export class IndexDb implements BrowserStorage {
  private readonly adaptee: ThirdPartyStorageController;

  constructor(adaptee: ThirdPartyStorageController) {
    this.adaptee = adaptee;
  }

  read(key: string): Promise<StorageValue> {
    return this.adaptee.getItem(key);
  }

  async write(key: string, value: StorageValue): Promise<boolean> {
    try {
      await this.adaptee.setItem(key, value);
    } catch (e) {
      return false;
    }
    return true;
  }
}
