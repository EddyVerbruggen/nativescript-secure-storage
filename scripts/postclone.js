var fs = require('fs');
var prompt = require('prompt');
var rimraf = require('rimraf');
var exec = require('child_process').exec;

var plugin_name,
  class_name,
  github_username,
  seed_plugin_name = "yourplugin",
  seed_class_name = "YourPlugin",
  seed_demo_property_name = "yourPlugin",
  seed_github_username = "YourName",
  demo_folder = "demo",
  init_git;

console.log('NativeScript Plugin Seed Configuration');
prompt.start();
askGithubUsername();

function askGithubUsername() {
    prompt.get({
        name: 'github_username',
        description: 'What is your GitHub username (used for updating package.json)? Example: NathanWalker / EddyVerbruggen'
    }, function (err, result) {
        if (err) {
            return console.log(err);
        }
        if (!result.github_username) {
            return console.log("Dude, the GitHub username is mandatory!");
        }
        github_username = result.github_username;
        askPluginName();
    });
}

function askPluginName() {
    prompt.get({
        name: 'plugin_name',
        description: 'What will be the name of your plugin? Use lowercase characters and dashes only. Example: yourplugin / google-maps / bluetooth'
    }, function (err, result) {
        if (err) {
            return console.log(err);
        }
        if (!result.plugin_name) {
            return console.log("Dude, the plugin name is mandatory!");
        }
        plugin_name = result.plugin_name;
        generateClassName();
    });
}

function generateClassName() {
    // the classname becomes 'GoogleMaps' when plugin_name is 'google_maps'
    class_name = "";
    var plugin_name_parts = plugin_name.split("-");
    for (var p in plugin_name_parts) {
        var part = plugin_name_parts[p];
        class_name += (part[0].toUpperCase() + part.substr(1));
    }
    console.log('Using ' + class_name + ' as the TypeScript Class name..');
    renameFiles();
}

function renameFiles() {
    console.log('Will now rename some files..');
    var files = fs.readdirSync(".");
    for (var f in files) {
      var file = files[f];
      if (file.indexOf(seed_plugin_name) === 0) {
          var newName = plugin_name + file.substr(file.indexOf("."));
          fs.renameSync(file, newName);
      }
    }

    adjustScripts();
}

function adjustScripts() {
    console.log('Adjusting scripts..');

    // add all files in the root
    var files = fs.readdirSync(".");

    // add demo's package.json
    files.push(demo_folder + "/package.json");

    // add the demo files
    var demoFiles = fs.readdirSync(demo_folder + "/app/");
    for (var d in demoFiles) {
      var demoFile = demoFiles[d];
      files.push(demo_folder + "/app/" + demoFile);
    }
    // add the tests
    files.push(demo_folder + "/app/tests/tests.js");

    // prepare and cache a few Regexp thingies
    var regexp_seed_plugin_name = new RegExp(seed_plugin_name, "g");
    var regexp_seed_class_name = new RegExp(seed_class_name, "g");
    var regexp_seed_demo_property_name = new RegExp(seed_demo_property_name, "g");
    var regexp_seed_github_username = new RegExp(seed_github_username, "g");

    for (var f in files) {
      var file = files[f];
      if (file.indexOf(".") > 0) {
        var contents = fs.readFileSync(file, 'utf8');
        var result = contents.replace(regexp_seed_plugin_name, plugin_name);
        result = result.replace(regexp_seed_class_name, class_name);
        result = result.replace(regexp_seed_demo_property_name, class_name[0].toLowerCase() + class_name.substr(1));
        result = result.replace(regexp_seed_github_username, github_username);
        fs.writeFileSync(file, result);
      }
    }

    initGit();
}

function initGit() {
    prompt.get({
        name: 'init_git',
        description: 'Do you want to init a fresh local git project? If you previously \'git clone\'d this repo that would be wise (y/n)',
        default: 'y'
    }, function (err, result) {
        if (err) {
            return console.log(err);
        }
        if (result.init_git && result.init_git.toLowerCase() === 'y') {
            rimraf.sync('.git');
            exec('git init -q .', function(err, stdout, stderr) {
                if (err) {
                    console.log(err);
                } else {
                    exec("git add '*' '.*'", function(err, stdout, stderr) {
                        if (err) {
                            console.log(err);
                        }
                    });
                }
            });
        }
        console.log("Configuration finished! If you're not happy with the result please clone the seed again and rerun this script.");
        console.log("You can now run 'npm run setup' and start cracking!");
    });
}