import { SecureStorageApi, GetOptions, SetOptions, RemoveOptions } from "./secure-storage.common";
import { ios as iosUtils } from "utils/utils";

declare const SAMKeychainQuery, SAMKeychain, kSecAttrAccessibleAlwaysThisDeviceOnly: any;

export class SecureStorage implements SecureStorageApi {

  private defaultService: string = "my_app";
  private isSimulator: boolean;

  constructor() {
    const processInfo = iosUtils.getter(NSProcessInfo, NSProcessInfo.processInfo);
    const isMinIOS9 = processInfo.isOperatingSystemAtLeastVersion({majorVersion: 9, minorVersion: 0, patchVersion: 0});
    if (isMinIOS9) {
      const simDeviceName = processInfo.environment.objectForKey("SIMULATOR_DEVICE_NAME");
      this.isSimulator = simDeviceName !== null;
    } else {
      const currentDevice = iosUtils.getter(UIDevice, UIDevice.currentDevice);
      this.isSimulator = currentDevice.name.toLowerCase().indexOf("simulator") > -1;
    }

    if (this.isSimulator) {
      console.log("Falling back to storing data in NSUserDefaults because of a Simulator bug");
    }
  }

  public get(arg: GetOptions): Promise<any> {
    let that = this;
    return new Promise((resolve, reject) => {

      if (this.isSimulator) {
        resolve(NSUserDefaults.standardUserDefaults.objectForKey(arg.key));
        return;
      }

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
  }

  public set(arg: SetOptions): Promise<boolean> {
    let that = this;
    return new Promise((resolve, reject) => {

      if (this.isSimulator) {
        NSUserDefaults.standardUserDefaults.setObjectForKey(arg.value, arg.key);
        resolve(true);
        return;
      }

      // TODO optionally pass in accessibility
      let accessibility = kSecAttrAccessibleAlwaysThisDeviceOnly;
      SAMKeychain.setAccessibilityType(accessibility);

      let query = SAMKeychainQuery.new();
      query.service = arg.service || that.defaultService;
      query.account = arg.key;
      query.password = arg.value;

      resolve(query.save());
    });
  }

  public remove(arg: RemoveOptions): Promise<boolean> {
    let that = this;
    return new Promise((resolve, reject) => {

      if (this.isSimulator) {
        NSUserDefaults.standardUserDefaults.removeObjectForKey(arg.key);
        resolve(true);
        return;
      }

      let query = SAMKeychainQuery.new();
      query.service = arg.service || that.defaultService;
      query.account = arg.key;

      try {
        resolve(query.deleteItem());
      } catch (e) {
        resolve(false);
      }
    });
  }
}