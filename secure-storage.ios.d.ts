import { SecureStorageApi, GetOptions, SetOptions, RemoveOptions } from "./secure-storage.common";
export declare class SecureStorage implements SecureStorageApi {
    private defaultService;
    private isSimulator;
    constructor();
    get(arg: GetOptions): Promise<any>;
    getSync(arg: GetOptions): any;
    set(arg: SetOptions): Promise<boolean>;
    setSync(arg: SetOptions): boolean;
    remove(arg: RemoveOptions): Promise<boolean>;
    removeSync(arg: RemoveOptions): boolean;
}
