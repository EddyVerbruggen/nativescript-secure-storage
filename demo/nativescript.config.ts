import { NativeScriptConfig } from '@nativescript/core'

export default {
  id: 'org.nativescript.plugindemo.securestorage',
  appResourcesPath: 'app/App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none',
  },
  name: 'demo',
  version: '1.0.0',
  appPath: 'app',
} as NativeScriptConfig
