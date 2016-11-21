# NativeScript Secure Storage plugin

* On __iOS__ we're leveraging the KeyChain,
* On __Android__ we're likely going to use KeyStore (work in progress).

## Installation
From the command prompt go to your app's root folder and execute:

```
tns plugin add nativescript-secure-storage
```

## Demo app
Want to dive in quickly? Check out [the demo](demo)! Otherwise, continue reading.

You can run the demo app from the root of the project by typing `npm run demo.ios.device`.

<img src="https://raw.githubusercontent.com/EddyVerbruggen/nativescript-secure-storage/master/screenshots/ios-demo.png" width="375px" height="500px"/>

## API

### `set`
> "In order to GET something you first need to SET it."
>
> -- _Eddy Verbruggen_


##### JavaScript
```js
// require the plugin
var SecureStorage = require("nativescript-secure-storage").SecureStorage;

// instantiate the plugin
var secureStorage = new SecureStorage();

secureStorage.set({
  key: "foo",
  value: "I was set at " + new Date()
}).then(
  function() {
    console.log("Successfully set a value");
  },
  function(err) {
    console.log("Error setting a value: " + err);
  }
);
```

##### TypeScript
```js
// require the plugin
import {SecureStorage} from "nativescript-secure-storage";

// instantiate the plugin
let secureStorage = new SecureStorage();

secureStorage.set({
  key: "foo",
  value: "I was set at " + new Date()
}).then(() => {
  console.log("Successfully set a value");
}, (err) => {
  console.log("Error setting a value: " + err);
});
```

### `get`

##### JavaScript
```js
secureStorage.get({
  key: "foo"
}).then(
  function(value) {
    console.log("Got value: " + value);
  },
  function(err) {
    console.log("Error getting a value: " + err);
  }
);
```

##### TypeScript
```js
secureStorage.get({
  key: "foo"
}).then((value) => {
  console.log("Got value: " + value);
}, (err) => {
  console.log("Error getting a value: " + err);
});
```

### `remove`

##### JavaScript
```js
secureStorage.remove({
  key: "foo"
}).then(
  function(value) {
    console.log("Removed value: " + value);
  },
  function(err) {
    console.log("Error removing a value: " + err);
  }
);
```

##### TypeScript
```js
secureStorage.remove({
  key: "foo"
}).then((value) => {
  console.log("Removed value: " + value);
}, (err) => {
  console.log("Error removing a value: " + err);
});
```

## Future work
* Android implementation - but it's not as trivial as iOS.