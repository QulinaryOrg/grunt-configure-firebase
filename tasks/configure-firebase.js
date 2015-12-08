/*
 * grunt-configure-firebase
 * https://github.com/QulinaryOrg/grunt-configure-firebase
 *
 * Copyright (c) 2015 Qulinary, Inc.
 * Licensed under the MIT license.
 */

'use strict';

var merge = require('merge');

module.exports = function (grunt) {

  grunt.registerMultiTask('configureFirebase', 'Configure local directory for firebase deployments', function () {

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

    if (!env) {
      grunt.fail.warn('No environment target provided');
      return;
    }

    switch (typeof this.data) {
    case 'object':
      firebaseJson = merge(options.json, this.data);
      delete firebaseJson.options;
      break;
    case 'string':
      firebaseJson = merge(options.json, {
        firebase: this.data
      });
      break;
    default:
      grunt.fail.warn('Invalid data for target `%s` (expected type object or string, but %s provided)',
        this.target, typeof this.data);
    }

    if (!firebaseJson.firebase) {
      grunt.fail.fatal('No firebase property provided for target `' + this.target + '` ' +
        '(this is the name of your firebase app and required as part of firebase.json. ' +
        'See https://www.firebase.com/docs/hosting/guide/full-config.html)');
      return;
    }

    grunt.verbose.writeln('Writing firebase JSON file to %s: %j', options.dest, firebaseJson);
    grunt.file.write(options.dest, JSON.stringify(firebaseJson, null, 2));
  });

};
