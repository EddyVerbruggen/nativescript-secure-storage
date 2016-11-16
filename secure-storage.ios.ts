import {SecureStorageApi, GetOptions, SetOptions, RemoveOptions} from "./secure-storage.common";

declare const SAMKeychainQuery, SAMKeychain, kSecAttrAccessibleAlwaysThisDeviceOnly: any;

export class SecureStorage implements SecureStorageApi {

  private defaultService: string = "my_app";

  constructor() {
  }

  public get(arg: GetOptions): Promise<any> {
    let that = this;
    return new Promise((resolve, reject) => {
      let query = SAMKeychainQuery.new();
      query.service = arg.service || that.defaultService;
      query.account = arg.key;

      if (query.fetch()) {
        resolve(query.password);
      } else {
        reject("Error retrieving value for key " + arg.key);
      }
    });
  };

  public set(arg: SetOptions): Promise<boolean> {
    let that = this;
    return new Promise((resolve, reject) => {

      // TODO optionally pass in accessibility
      let accessibility = kSecAttrAccessibleAlwaysThisDeviceOnly;
      SAMKeychain.setAccessibilityType(accessibility);

      let query = SAMKeychainQuery.new();
      query.service = arg.service || that.defaultService;
      query.account = arg.key;
      query.password = arg.value;

      if (query.save()) {
        resolve();
      } else {
        reject("Error saving value for key " + arg.key);
      }
    });
  };

  public remove(arg: RemoveOptions): Promise<boolean> {
    let that = this;
    return new Promise((resolve, reject) => {
      let query = SAMKeychainQuery.new();
      query.service = arg.service || that.defaultService;
      query.account = arg.key;

      if (query.deleteItem()) {
        resolve();
      } else {
        reject("Error removing value for key " + arg.key);
      }
    });
  };
}