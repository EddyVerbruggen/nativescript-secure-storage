import {Observable} from "data/observable";
import {SecureStorage, GetOptions, SetOptions} from "nativescript-secure-storage";

export class HelloWorldModel extends Observable {
  public message: string;
  private secureStorage: SecureStorage;

  constructor() {
    super();
    this.secureStorage = new SecureStorage();
  }

  public doGet() {
    let that = this;
    this.secureStorage.get({
      key: "foo"
    }).then((value) => {
      console.log("Value: " + value);
      that.set("lastRetrievedValue", value === null ? "(no value set)" : value);
    }, (err) => {
      console.log(err);
    });
  }

  public doSet() {
    let that = this;
    this.secureStorage.set({
      key: "foo",
      value: "I was set at " + new Date()
    }).then((success) => {
      console.log("Successfully set a value? " + success);
    }, (err) => {
      console.log(err);
    });
  }

  public doRemove() {
    let that = this;
    this.secureStorage.remove({
      key: "foo"
    }).then((success) => {
      console.log("Successfully removed a value? " + success);
      that.set("lastRetrievedValue", "");
    }, (err) => {
      console.log(err);
    });
  }
}