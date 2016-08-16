/*
 * grunt-configure-firebase
 * https://github.com/QulinaryOrg/grunt-configure-firebase
 *
 * Copyright (c) 2015 Qulinary, Inc.
 * Licensed under the MIT license.
 */

'use strict';

var extend = require('extend');

module.exports = function (grunt) {

  grunt.registerMultiTask('configureFirebase', 'Configure local directory for firebase deployments', function () {

    var options = this.options({
        'default': 'true',
        destJson: 'firebase.json',
        destRc: '.firebaserc',
        indexFile: 'index.html',
        spa: true,
        json: {
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
        }
      }),
      firebaseJson,
      firebaseRc = {},
      firebaseAppName;

    if (!this.target) {
      grunt.fail.warn('No target provided');
      return;
    }

    switch (typeof this.data) {
    case 'object':
      firebaseJson = extend(true, options.json, this.data);
      delete firebaseJson.options;
      break;
    case 'string':
      firebaseJson = options.json;
      options.app = this.data;
      break;
    default:
      grunt.fail.warn('Invalid data for target `%s` (expected type object or string, but %s provided)',
        this.target, typeof this.data);
    }

    firebaseAppName = options.app || options.firebase;
    if (!firebaseAppName) {
      grunt.fail.fatal('No `app` or `firebase` property provided for target `' + this.target + '` ' +
        '(this is the name of your firebase app and required as part of .firbaserc ' +
        'See https://www.firebase.com/docs/hosting/guide/full-config.html)');
      return;
    }

    if (options.spa) {
      grunt.verbose.writeln('Option `spa` is enabled; adding rewrite to `%s`', options.indexFile);
      firebaseJson.hosting.rewrites.push({
        source: '**',
        destination: '/' + options.indexFile
      });
    }

    grunt.verbose.write('Writing file `%s` with contents: %j', options.destJson, firebaseJson);
    grunt.verbose.or.write('Writing file `%s`...', options.destJson);
    grunt.file.write(options.destJson, JSON.stringify(firebaseJson, null, 2));
    grunt.log.ok();

    if (grunt.file.exists(options.destRc)) {
      grunt.log.writeln('File `%s` exists; will append new app `%s`', options.destRc, firebaseAppName);
      firebaseRc = grunt.file.readJSON(options.destRc);
    } else {
      firebaseRc = {};
    }
    firebaseRc.projects = firebaseRc.projects || {};
    firebaseRc.projects[this.target] = firebaseAppName;

    if (options.default) {
      grunt.verbose.writeln('Option `default` is enabled; setting default app to `%s`', firebaseAppName);
      firebaseRc.projects['default'] = firebaseAppName;
    }

    grunt.verbose.write('Writing file `%s` with contents: %j', options.destRc, firebaseRc);
    grunt.verbose.or.write('Writing file `%s`...', options.destRc);
    grunt.file.write(options.destRc, JSON.stringify(firebaseRc, null, 2));
    grunt.log.ok();

    grunt.log.ok('Created/updated `%s` and `%s`', options.destJson, options.destRc);
  });

};
