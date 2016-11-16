# Develop a NativeScript plugin now (w/ TypeScript)

## Getting started

1. `git clone https://github.com/NathanWalker/nativescript-plugin-seed.git myplugin`
2. `npm install -g typescript`
3. `cd myplugin`
4. `npm run postclone`
5. `npm run setup`
6. Get to work.

This seed expands on several things [presented here](http://developer.telerik.com/featured/creating-nativescript-plugins-in-typescript/).

## Usage

The seed is prepared to allow you to test and try out your plugin via the `demo` folder.
Additionally it provides a proper `.gitignore` to keep GitHub tidy as well as `.npmignore` to ensure everyone is happy when you publish your plugin via npm.

### Linking to CocoaPod or Android Arsenal plugins

You will want to create these folders and files in the root:

```
platforms --
  ios --
    Podfile
  android --
    include.gradle
```

Doing so will open up those native apis to your plugin :)

Take a look at these existing plugins for how that can be done very simply:

* [nativescript-cardview](https://github.com/bradmartin/nativescript-cardview/tree/master/platforms)
* [nativescript-floatingactionbutton](https://github.com/bradmartin/nativescript-floatingactionbutton/tree/master/platforms)

### Typical development workflow:

1. Make changes to plugin files
2. Make changes in `demo` that would test those changes out
3. `npm run demo.ios` or `npm run demo.android`  **(must be run from the root directory)**

Those `demo` tasks are just general helpers. You may want to have more granular control on the device and/or emulator you want to run. For that, you can just run things the manual way:

```
cd demo

// when developing, to ensure the latest code is built into the demo, it's a guarantee to remove the plugin and add it back
tns plugin remove nativescript-secure-storage
tns plugin add ..

// manual platform adds
tns platform add ios
// and/or
tns platform add android
```

Then use any of the available options from the `tns` command line:

* [Emulate your project](https://github.com/NativeScript/nativescript-cli#emulate-your-project)
* [Run your project](https://github.com/NativeScript/nativescript-cli#run-your-project)
* [Full list of commands](https://github.com/NativeScript/nativescript-cli#the-commands)

## Unittesting
This plugin automatically adds Jasmine-based unittest support to your plugin.
Open `demo/app/tests/tests.js` and adjust its contents.

You can read more about this topic [here](https://docs.nativescript.org/tooling/testing).

Once you're ready to test your plugin's API execute one of these commands in the plugin root:

```
npm run test.ios
npm run test.android
```

## Publish

When you have everything ready to publish:

* Bump the version number in `package.json`
* `npm run build` - **very important** - ensure the latest is built **before** you publish
* `npm publish`

## Contributing - Want to make the seed better?

Or at least help keep it up to date with NativeScript releases, which would be excellent.

```
npm install -g typescript  // if you don't already have it
git clone https://github.com/NathanWalker/nativescript-plugin-seed
cd nativescript-plugin-seed

// Improve!
```
