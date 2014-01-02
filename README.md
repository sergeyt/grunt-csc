[![NPM version][npmver-image]][npmver] [![Build Status][build-image]][build-status] [![Deps Status][dep-image]][dep-status]

# grunt-csc

> A grunt plugin to compile c# assemblies

[![NPM][npm-image]][npm]

## Getting Started

This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide,
as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins.
Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-csc --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-csc');
```

## Task Configuration

In your Gruntfile add a section named `csc` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  csc: {
    options: {
      // global csc options here
    },
    all: {
      modules: [
        // module definitions
      ]
    },
  },
})
```

You could find sample [Gruntfile](https://github.com/sergeyt/grunt-csc/blob/master/demo/Gruntfile.coffee) in [demo](https://github.com/sergeyt/grunt-csc/tree/master/demo) folder.

### Options

The sample options:

```js
{
  outdir: 'bin', // specify output directory
}
```

### Module Definition

The sample module definition:

```js
{
  name: 'MyModule', // specify module name required for resolving dependencies between modules
  out: 'MyModule.dll', // specify module output file
  src: 'MyModuleDir/**/*.cs', // specify module source files to be compiled
  deps: 'mod1,mod2', // array or comma-separated list of names of modules on which this module depends
}
```

[build-image]: https://drone.io/github.com/sergeyt/grunt-csc/status.png
[build-status]: https://drone.io/github.com/sergeyt/grunt-csc/latest
[dep-image]: https://david-dm.org/sergeyt/grunt-csc.png
[dep-status]: https://david-dm.org/sergeyt/grunt-csc
[npm-image]: https://nodei.co/npm/grunt-csc.png?downloads=true&stars=true
[npm]: https://nodei.co/npm/grunt-csc/
[npmver-image]: https://badge.fury.io/js/grunt-csc.png
[npmver]: http://badge.fury.io/js/grunt-csc
