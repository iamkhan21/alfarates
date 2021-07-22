export interface RequestClient {
  get(url: string): Promise<any>;
}
