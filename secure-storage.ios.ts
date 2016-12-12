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

      try {
        query.fetch();
        resolve(query.password);
      } catch (e) {
        resolve(null);
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

      resolve(query.save());
    });
  };

  public remove(arg: RemoveOptions): Promise<boolean> {
    let that = this;
    return new Promise((resolve, reject) => {
      let query = SAMKeychainQuery.new();
      query.service = arg.service || that.defaultService;
      query.account = arg.key;

      try {
        resolve(query.deleteItem());
      } catch (e) {
        resolve(false);
      }
    });
  };
}