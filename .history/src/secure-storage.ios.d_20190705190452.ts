import { SecureStorageApi, GetOptions, SetOptions, RemoveOptions, RemoveAllOptions } from "./secure-storage.common";
export declare class SecureStorage implements SecureStorageApi {
    private isSimulator;
    private accessibilityType;
    private static defaultService;
    private static kSSKeychainAccountKey_copy;
    constructor(accessibilityType?: string);
    get(arg: GetOptions): Promise<any>;
    getSync(arg: GetOptions): any;
    set(arg: SetOptions): Promise<boolean>;
    setSync(arg: SetOptions): boolean;
    remove(arg: RemoveOptions): Promise<boolean>;
    removeSync(arg: RemoveOptions): boolean;
    removeAll(arg?: RemoveAllOptions): Promise<boolean>;
    removeAllSync(arg?: RemoveAllOptions): boolean;
}
