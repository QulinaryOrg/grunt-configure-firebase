# grunt-configure-firebase

> Configure local directory for firebase deployments

[![Build Status](https://travis-ci.org/QulinaryOrg/grunt-configure-firebase.svg?branch=master)](https://travis-ci.org/QulinaryOrg/grunt-configure-firebase)

**NOTE: works with firebase CLI version 3.* - if you need 2.* use 0.1.2 of this plugin**

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-configure-firebase --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-configure-firebase');
```

## The "configureFirebase" task

The task generates `firebase.json` and `.firebaserc` for a basic static web app.

### Overview
In your project's Gruntfile, add a section named `configureFirebase` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  configureFirebase: {
    production: 'my-company',
    staging: 'my-company-staging'
  },
});
```

### Options

#### options.app
Type: `String`

The firebase app name, if you use the object style notation

app: 'some-company-app',
'default': false,
destJson: 'tmp/custom-options.json',
destRc: 'tmp/.custom-options-rc',
spa: false

#### options.default
Type: `Boolean`
Default value: true

Whether the current target should be saved in `.firebaserc` as the default app.

#### options.spa
Type: `Boolean`
Default value: true

Whether to add default rewrite rule suitable for a single page application (SPA)

#### options.index
Type: `String`
Default value: index.html

Location for default rewrite rule.

#### options.destJson
Type: `String`
Default value: `'firebase.json'`

Location to write firebase.json file.

#### options.destRc
Type: `String`
Default value: `'.firbaserc'`

Location to write .firbaserc file.

#### options.json
Type: `Object`
Default value:
```
hosting: {
  public: 'app',
  rewrites: [],
  ignore: [
    'firebase.json',
    'Gruntfile.js',
    'bower.json',
    'package.json',
    '.travis.yml',
    'README.md',
    '*rc',
    '**/node_modules/**'
  ]
}
```

Contents for `firebase.json` file to bet written for all targets. This is overwritten by the target-specific info.

### Usage Examples

#### Default Options

This will write to `firebase.json`

```js
grunt.initConfig({
  configureFirebase: {
    options: {},
    prod: 'my-company',
    stage: 'my-company-staging'
  }
});
```

`configureFirebase:prod` results in `.firebaserc` of:

```
{
  "projects": {
    "default": "my-company",
    "prod": "my-company"
  }
}
```

And then running `configureFirebase:stage` results in `.firebaserc` of:

```
{
  "projects": {
    "default": "my-company-staging",
    "prod": "my-company",
    "stage": "my-company-staging"
  }
}
```

#### Custom Options

```js
grunt.initConfig({
  configureFirebase: {
    options: {
      dest: 'tmp/firebase.json'
    },
    production: {
      options: {
        app: 'my-company',
        spa: false
      },
      hosting: {        
        public: 'dist',
        ignore: [
          'bower_components'
        ]  
      }
    }
  },
});
```

Will result in:

```
{
  "hosting": {
    "public": "dist",
    "rewrites": [],    
    "ignore": [
      "bower_components"
    ]
  }
}
```

## Contributing

Javascript should follow the provided .jsbeautifyrc spec.

* Run `grunt jshint` to test your code's quality
* Run `grunt jsbeautifier:test` to test your code's format'
* Run `grunt jsbeautifier:fix` to format your code according to the spec

## Release History

### 1.0.2

* [bug] Fix error "Warning: Cannot read property 'push' of undefined"

### 1.0.1

* [bug] Fix jshint when using v6.3.1

## 1.0.0

* [enhancement] Update to reflect google's new firebase configuration

### 0.1.2

* [bug] Remove unsupported option from Gruntfile
* [docs] Remove erroneous info from README

### 0.1.1

* [bug] Fix travis CI config

### 0.1.0

* [feature] Add initial working version with test cases
* [docs] Add documentation


