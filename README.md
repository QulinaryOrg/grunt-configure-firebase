# grunt-configure-firebase

> Configure local directory for firebase deployments

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


    var env = this.target,
      options = this.options({
        dest: 'firebase.json',
        json: {
          firebase: '',
          public: 'app',
          ignore: [
            'firebase.json',
            '**/.*',
            '**/node_modules/**'
          ]
        }
      }),
      firebaseJson;

### Options

#### options.dest
Type: `String`
Default value: `'firebase.json'`

Location to write firebase.json file.

#### options.json
Type: `Object`
Default value: `{}`

Contents for `firebase.json` file to bet written for all targets. This is overwritten by the target-specific info.

See: [Firebase Config Reference](https://www.firebase.com/docs/hosting/guide/full-config.html)

### Usage Examples

#### Default Options

This will write to `firebase.json`

* `configureFirabse:prod` results in `firebase` property set to `my-company`
* `configureFirabse:stage` results in `firebase` property set to `my-company-staging`

```js
grunt.initConfig({
  configureFirebase: {
    options: {},
    prod: 'my-company',
    stage: 'my-company-staging'
  }
});
```

#### Custom Options

This will write to a custom location:

```js
grunt.initConfig({
  configureFirebase: {
    options: {
      dest: 'tmp/firebase.json'
    },
    production: {
      firebase: 'my-company',
      public: 'dist',
      ignore: [
        'bower_components'
      ]
    }
  },
});
```

Will result in:

```
{
  "firebase": "my-company",
  "public": "dist",
  "ignore": [
    "bower_components"
  ]
}
```

## Contributing

Javascript should follow the provided .jsbeautifyrc spec.

* Run `grunt jshint` to test your code's quality
* Run `grunt jsbeautifier:test` to test your code's format'
* Run `grunt jsbeautifier:fix` to format your code according to the spec

## Release History

### 0.1.0

* [feature] Add initial working version with test cases
* [docs] Add documentation


