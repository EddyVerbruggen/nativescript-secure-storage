# NativeScript Secure Storage plugin

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]
[![Twitter Follow][twitter-image]][twitter-url]

[npm-image]:http://img.shields.io/npm/v/nativescript-secure-storage.svg
[npm-url]:https://npmjs.org/package/nativescript-secure-storage
[downloads-image]:http://img.shields.io/npm/dm/nativescript-secure-storage.svg
[twitter-image]:https://img.shields.io/twitter/follow/eddyverbruggen.svg?style=social&label=Follow%20me
[twitter-url]:https://twitter.com/eddyverbruggen

## Installation
From the command prompt go to your app's root folder and execute:

```
tns plugin add nativescript-secure-storage
```

## Demo app
Want to dive in quickly? Check out [the demo](demo)! Otherwise, continue reading.

You can run the demo app from the root of the project by typing `npm run demo.ios.device`.

<img src="https://raw.githubusercontent.com/EddyVerbruggen/nativescript-secure-storage/master/screenshots/ios-demo.png?v=2" width="375px" height="500px"/>

__PRO TIP:__ Want to store objects instead of strings? Use `JSON.stringify` with `set` and `JSON.parse` with `get`.

## API

### `set` | `setSync`
> "In order to GET something you first need to SET it."
>
> -- _Eddy Verbruggen_

##### JavaScript
```js
// require the plugin
var SecureStorage = require("nativescript-secure-storage").SecureStorage;

// instantiate the plugin
var secureStorage = new SecureStorage();

// async
secureStorage.set({
  key: "foo",
  value: "I was set at " + new Date()
}).then(
  function(success) {
    console.log("Successfully set a value? " + success);
  }
);

// sync
var success = secureStorage.setSync({
  key: "foo",
  value: "I was set at " + new Date()
});
```

##### TypeScript
```typescript
// require the plugin
import { SecureStorage } from "nativescript-secure-storage";

// instantiate the plugin
let secureStorage = new SecureStorage();

// async
secureStorage.set({
  key: "foo",
  value: "I was set at " + new Date()
}).then(success => console.log("Successfully set a value? " + success));

// sync
const success = secureStorage.setSync({
  key: "foo",
  value: "I was set at " + new Date()
});
```

### `get` | `getSync`
Will return `null` if not found.

##### JavaScript
```js
// async
secureStorage.get({
  key: "foo"
}).then(
  function(value) {
    console.log("Got value: " + value);
  }
);

// sync
var value = secureStorage.getSync({
  key: "foo"
});
```

##### TypeScript
```typescript
// async
secureStorage.get({
  key: "foo"
}).then(value => console.log("Got value: " + value));

// sync
const value = secureStorage.getSync({
  key: "foo"
});
```

### `remove` | `removeSync`

##### JavaScript
```js
// async
secureStorage.remove({
  key: "foo"
}).then(
  function(success) {
    console.log("Removed value? " + success);
  }
);

// sync
var success = secureStorage.removeSync({
  key: "foo"
});
```

##### TypeScript
```typescript
// async
secureStorage.remove({
  key: "foo"
}).then(success => console.log("Successfully removed a value? " + success));

// sync
const success = secureStorage.removeSync({
  key: "foo"
});
```

### `removeAll` | `removeAllSync`

##### JavaScript
```js
// async
secureStorage.removeAll().then(
  function(success) {
    console.log("Removed value? " + success);
  }
);

// sync
var success = secureStorage.removeAllSync();
```

##### TypeScript
```typescript
// async
secureStorage.removeAll().then(success => console.log("Successfully removed a value? " + success));

// sync
const success = secureStorage.removeAllSync();
```

### `clearAllOnFirstRun` | `clearAllOnFirstRunSync`
These functions can be used if you want to clear data when your app is reinstalled.

This is only really useful **on iOS** because if you write something (through this plugin) to the Keychain, this data **won't** be removed when the app is uninstalled.
So the next time the same app is installed, it will find the data in the keychain.

So if you want to clear 'lingering' data from a previous install, make sure you run one of these
methods before using other methods this plugin provides.

##### JavaScript
```js
// async
secureStorage.clearAllOnFirstRun().then(
  function(success) {
      console.log(success ? "Successfully removed all data on the first run" : "Data not removed because this is not the first run");
  }
);

// sync
var success = secureStorage.clearAllOnFirstRunSync();
```

##### TypeScript
```typescript
// async
secureStorage.clearAllOnFirstRun().then(success => {
    console.log(success ? "Successfully removed all data on the first run" : "Data not removed because this is not the first run");
});

// sync
const success = secureStorage.clearAllOnFirstRunSync();
```

### `isFirstRun` | `isFirstRunSync`
As a bonus, you can piggyback the 'first run' mechanism to do anything you want when the plugin detects
this is the first run (after an install or install-delete-reinstall).

##### TypeScript
```typescript
// sync
if (secureStorage.isFirstRunSync()) {
  // do whatever you want
}

// async
secureStorage.isFirstRun().then(isFirst => {
  // if isFirst is true, do whatever you like
});
```

## Usage with Angular

In your view:

```html
<Button text="set secure value" (tap)="setSecureValue()"></Button>
```

In your `@Component`:

```typescript
import { SecureStorage } from "nativescript-secure-storage";

export class MyComponent {
  secureStorage = new SecureStorage();

  // a method that can be called from your view
  setSecureValue() {
    this.secureStorage.set({
      key: 'myKey',
      value: 'my value'
    }).then(success => { console.log(success)});
  }
}
```
## iOS Security++
By default the plugin uses `kSecAttrAccessibleAlwaysThisDeviceOnly` access control to the keychain. This means that the keychain value can be accessed even if the device is locked. If you want to enhance security and you do not need background access, or if you want to allow the value to be backed up and migrated to another device, you can use any of keys defined [here](https://developer.apple.com/documentation/security/ksecattraccessiblealwaysthisdeviceonly?language=objc#see-also) and pass it when you create an instance of `SecureStorage`, for example
```ts
declare const kSecAttrAccessibleWhenUnlockedThisDeviceOnly; // This is needed in case you don't have tns-platform-declarations module installed. 
const secureStorage = new SecureStorage(kSecAttrAccessibleWhenUnlockedThisDeviceOnly);
```

## Credits
* On __iOS__ we're leveraging the KeyChain using the [SAMKeychain](https://github.com/soffes/SAMKeychain) library (on the Simulator `NSUserDefaults`),
* On __Android__ we're using [Hawk](https://github.com/orhanobut/hawk) library which internally uses [Facebook conceal](https://github.com/facebook/conceal).
* Thanks, [Prabu Devarrajan](https://github.com/prabudevarrajan) for [adding the `deleteAll` function](https://github.com/EddyVerbruggen/nativescript-secure-storage/pull/11)!
