/*
 * grunt-configure-firebase
 * https://github.com/QulinaryOrg/grunt-configure-firebase
 *
 * Copyright (c) 2015 Matthew J. Martin
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);
  grunt.loadTasks('tasks');

  // project configuration.
  grunt.initConfig({

    // make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: {
        src: [
          'Gruntfile.js',
          'tasks/*.js',
          '<%= nodeunit.tests %>'
        ]
      }
    },

    // enforce code style guideline
    jsbeautifier: {
      options: {
        config: '.jsbeautifyrc'
      },
      fix: {
        options: {
          mode: 'VERIFY_AND_WRITE'
        },
        src: [
          'Gruntfile.js',
          'tasks/*.js',
          '<%= nodeunit.tests %>'
        ]
      },
      test: {
        options: {
          mode: 'VERIFY_ONLY'
        },
        src: [
          'Gruntfile.js',
          'tasks/*.js',
          '<%= nodeunit.tests %>'
        ]
      }
    },

    // before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // configuration to be run (and then tested).
    configureFirebase: {
      defaultOptions: 'production-app',
      customOptions: {
        options: {
          dest: 'tmp/custom-options.json',
          public: 'dist'
        },
        firebase: 'some-company-app',
        public: 'dist',
        ignore: [
          'firebase.json',
          'bower_components/**',
          'node_modules/**'
        ]
      }
    },

    // unit tests
    nodeunit: {
      tests: ['test/*test.js']
    },

    // for cutting new releases
    release: {}

  });

  // enforce code quaity
  grunt.registerTask('codequality', ['jshint', 'jsbeautifier:test']);

  // whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'configureFirebase', 'codequality', 'nodeunit']);

  // by default, fix style of files and run all tests
  grunt.registerTask('default', ['jsbeautifier:fix', 'test']);

};
