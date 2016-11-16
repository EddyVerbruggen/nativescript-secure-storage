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
      that.set("lastRetrievedValue", value);
    }, (err) => {
      alert(err);
    });
  }

  public doSet() {
    let that = this;
    this.secureStorage.set({
      key: "foo",
      value: "I was set at " + new Date()
    }).then(() => {
      console.log("Successfully set a value");
    }, (err) => {
      alert(err);
    });
  }

  public doRemove() {
    let that = this;
    this.secureStorage.remove({
      key: "foo"
    }).then(() => {
      console.log("Successfully removed a value");
      that.set("lastRetrievedValue", "");
    }, (err) => {
      alert(err);
    });
  }
}