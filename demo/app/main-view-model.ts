import {Observable} from 'data/observable';
import {SecureStorage} from 'nativescript-secure-storage';

export class HelloWorldModel extends Observable {
  public message: string;
  private secureStorage: SecureStorage;

  constructor() {
    super();

    this.secureStorage = new SecureStorage();
    this.message = this.secureStorage.message;
  }
}