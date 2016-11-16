var SecureStorage = require("nativescript-secure-storage").SecureStorage;
var secureStorage = new SecureStorage();

// TODO replace 'functionname' with an acual function name of your plugin class and run with 'npm test <platform>'
describe("functionname", function() {
  it("exists", function() {
    expect(secureStorage.functionname).toBeDefined();
  });

  it("returns a promise", function() {
    expect(secureStorage.functionname()).toEqual(jasmine.any(Promise));
  });
});