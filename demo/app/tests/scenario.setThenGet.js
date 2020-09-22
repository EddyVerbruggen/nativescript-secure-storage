var secureStorage = new (require("nativescript-secure-storage").SecureStorage)();

describe("set then get", function() {
  it("sets, then gets the correct value", function(done) {
    var key = "foo";
    var value = "bar";

    secureStorage.set({key:key, value:value}).then(function(result) {
      expect(result).toBe(true);

      secureStorage.get({key:key}).then(function(returnValue) {
        expect(returnValue).toEqual(value);
        done();
      });
    });
  });
});