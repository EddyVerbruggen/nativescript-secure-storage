To generate the .d.ts file from the Podfile's library
-----------------------------------------------------

From a plain Terminal (not running 'fish' fi.) do:

$ cd demo
$ TNS_DEBUG_METADATA_PATH="$(pwd)/metadata" tns build ios
$ TNS_TYPESCRIPT_DECLARATIONS_PATH="$(pwd)/typings" tns build ios

Grab the generated file from the typings folder