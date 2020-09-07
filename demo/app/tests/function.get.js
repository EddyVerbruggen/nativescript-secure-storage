var secureStorage = new (require("nativescript-secure-storage").SecureStorage)();

describe("get", function() {
  it("exists", function() {
    expect(secureStorage.get).toBeDefined();
  });

  it("returns a promise", function() {
    expect(secureStorage.get()).toEqual(jasmine.any(Promise));
  });
});