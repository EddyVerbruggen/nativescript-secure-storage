import {SecureStorageApi, GetOptions, SetOptions, RemoveOptions} from "./secure-storage.common";

export class SecureStorage implements SecureStorageApi {

  constructor() {
  }

  public get(arg: GetOptions): Promise<any> {
    return new Promise((resolve, reject) => {
      reject("Not implemented yet");
    });
  };

  public set(arg: SetOptions): Promise<boolean> {
    return new Promise((resolve, reject) => {
      reject("Not implemented yet");
    });
  };

  public remove(arg: RemoveOptions): Promise<boolean> {
    return new Promise((resolve, reject) => {
      reject("Not implemented yet");
    });
  };
}