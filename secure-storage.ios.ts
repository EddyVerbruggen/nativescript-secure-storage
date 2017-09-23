import { SecureStorageApi, GetOptions, SetOptions, RemoveOptions } from "./secure-storage.common";
import { ios as iosUtils } from "tns-core-modules/utils/utils";

declare const SAMKeychainQuery, SAMKeychain, kSecAttrAccessibleAlwaysThisDeviceOnly, NSUserDefaults, NSBundle: any;

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
    return new Promise((resolve, reject) => {
      if (this.isSimulator) {
        resolve(NSUserDefaults.standardUserDefaults.objectForKey(arg.key));
        return;
      }

      let query = SAMKeychainQuery.new();
      query.service = arg.service || this.defaultService;
      query.account = arg.key;

      try {
        query.fetch();
        resolve(query.password);
      } catch (e) {
        resolve(null);
      }
    });
  }

  getSync(arg: GetOptions): any {
    if (this.isSimulator) {
      return NSUserDefaults.standardUserDefaults.objectForKey(arg.key);
    }

    let query = SAMKeychainQuery.new();
    query.service = arg.service || this.defaultService;
    query.account = arg.key;
    try {
      query.fetch();
      return query.password;
    } catch (e) {
      return null;
    }
  }

  public set(arg: SetOptions): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.isSimulator) {
        NSUserDefaults.standardUserDefaults.setObjectForKey(arg.value, arg.key);
        resolve(true);
        return;
      }

      SAMKeychain.setAccessibilityType(kSecAttrAccessibleAlwaysThisDeviceOnly);
      let query = SAMKeychainQuery.new();
      query.service = arg.service || this.defaultService;
      query.account = arg.key;
      query.password = arg.value;
      resolve(query.save());
    });
  }

  setSync(arg: SetOptions): boolean {
    if (this.isSimulator) {
      NSUserDefaults.standardUserDefaults.setObjectForKey(arg.value, arg.key);
      return true;
    }

    SAMKeychain.setAccessibilityType(kSecAttrAccessibleAlwaysThisDeviceOnly);
    let query = SAMKeychainQuery.new();
    query.service = arg.service || this.defaultService;
    query.account = arg.key;
    query.password = arg.value;
    return query.save();
  }

  public remove(arg: RemoveOptions): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.isSimulator) {
        NSUserDefaults.standardUserDefaults.removeObjectForKey(arg.key);
        resolve(true);
        return;
      }

      let query = SAMKeychainQuery.new();
      query.service = arg.service || this.defaultService;
      query.account = arg.key;
      try {
        resolve(query.deleteItem());
      } catch (e) {
        resolve(false);
      }
    });
  }

  removeSync(arg: RemoveOptions): boolean {
    if (this.isSimulator) {
      NSUserDefaults.standardUserDefaults.removeObjectForKey(arg.key);
      return true;
    }

    let query = SAMKeychainQuery.new();
    query.service = arg.service || this.defaultService;
    query.account = arg.key;
    try {
      return query.deleteItem();
    } catch (e) {
      return false;
    }
  }

  public removeAll(arg: RemoveAllOptions): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.isSimulator) {
        let defaults = NSUserDefaults.standardUserDefaults;
        let bundleId = NSBundle.mainBundle.bundleIdentifier;
        defaults.removePersistentDomainForName(bundleId);
        resolve(true);
        return;
      }

      try {
        let allAccounts = SAMKeychain.allAccounts();
        for ( let i = 0; i < allAccounts.count; i++) {
          let key = allAccounts[i].objectForKey('acct');
          let query = SAMKeychainQuery.new();
          query.service = arg.service || this.defaultService;
                    query.account = key;
          query.deleteItem();
        }
        resolve(true);
      } catch (e) {
        resolve(false);
      }
    });
  }

  public removeAllSync(arg: RemoveAllOptions): boolean {
    if (this.isSimulator) {
      let defaults = NSUserDefaults.standardUserDefaults;
      let bundleId = NSBundle.mainBundle.bundleIdentifier;
      defaults.removePersistentDomainForName(bundleId);
      return true;
    }

    try {
      let allAccounts = SAMKeychain.allAccounts();
      for ( let i = 0; i < allAccounts.count; i++) {
        console.log('Deleteing ' + allAccounts[i]);
        let key = allAccounts[i].objectForKey('acct');
        let query = SAMKeychainQuery.new();
        query.service = arg.service || this.defaultService;
        query.account = key;
        query.deleteItem();
      }
      return true;
    } catch (e) {
      return false;
    }
  }

}
