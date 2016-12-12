# NativeScript Secure Storage plugin

* On __iOS__ we're leveraging the KeyChain using the [SAMKeychain](https://github.com/soffes/SAMKeychain) library,
* On __Android__ we're using [Hawk](https://github.com/orhanobut/hawk) library which internally uses [Facebook conceal](https://github.com/facebook/conceal).

## Installation
From the command prompt go to your app's root folder and execute:

```
tns plugin add nativescript-secure-storage
```

## Demo app
Want to dive in quickly? Check out [the demo](demo)! Otherwise, continue reading.

You can run the demo app from the root of the project by typing `npm run demo.ios.device`.

<img src="https://raw.githubusercontent.com/EddyVerbruggen/nativescript-secure-storage/master/screenshots/ios-demo.png?v=2" width="375px" height="500px"/>

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
  function(success) {
    console.log("Successfully set a value? " + success);
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
}).then(success => console.log("Successfully set a value? " + success));
```

### `get`
Will return `null` if not found.

##### JavaScript
```js
secureStorage.get({
  key: "foo"
}).then(
  function(value) {
    console.log("Got value: " + value);
  }
);
```

##### TypeScript
```js
secureStorage.get({
  key: "foo"
}).then(value => console.log("Got value: " + value));
```

### `remove`

##### JavaScript
```js
secureStorage.remove({
  key: "foo"
}).then(
  function(success) {
    console.log("Removed value? " + success);
  }
);
```

##### TypeScript
```js
secureStorage.remove({
  key: "foo"
}).then(success => console.log("Successfully removed a value? " + success));
```

## Usage with Angular

In your view:

```html
<Button text="set secure value" (tap)="setSecureValue()"></Button>
```

In your `@Component`:

```js
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