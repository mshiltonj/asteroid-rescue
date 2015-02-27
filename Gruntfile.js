module.exports = function(grunt){

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    connect: {
      all: {
        options: {
          keepalive: true,
         // base: 'src',
          livereload :true
        }
      }
    },

    watch: {
      live: {
        files: ['src/**'],
        tasks:[],
        options:{
          livereload: true
        }
      }
    }
  });


  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

};
