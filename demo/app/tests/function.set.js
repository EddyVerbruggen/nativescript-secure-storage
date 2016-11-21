/// <reference path="typings/jasmine.d.ts" />
var secureStorage = new (require("nativescript-secure-storage").SecureStorage)();

describe("set", function() {
  it("exists", function() {
    expect(secureStorage.set).toBeDefined();
  });

  it("returns a promise", function() {
    expect(secureStorage.set()).toEqual(jasmine.any(Promise));
  });

  it("sets a value", function(done) {
    var key = "foo1";
    var value = "bar1";

    secureStorage.set({key:key, value:value}).then(function() {
      expect(true).toBe(true);
      done();
    });
  });
});