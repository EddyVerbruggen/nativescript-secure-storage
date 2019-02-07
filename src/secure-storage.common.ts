export interface SetOptions {
  service?: string;
  key: string;
  value: string;
}

export interface GetOptions {
  service?: string;
  key: string;
}

export interface RemoveOptions {
  service?: string;
  key: string;
}

export interface RemoveAllOptions {
  service?: string;
}

export interface SecureStorageApi {
  get(arg: GetOptions): Promise<any>;
  getSync(arg: GetOptions): any;

  set(arg: SetOptions): Promise<boolean>;
  setSync(arg: SetOptions): boolean;

  remove(arg: RemoveOptions): Promise<boolean>;
  removeSync(arg: RemoveOptions): boolean;

  removeAll(arg?: RemoveAllOptions): Promise<boolean>;
  removeAllSync(arg?: RemoveAllOptions): boolean;
}
