module.exports = function(grunt) {

grunt.loadNpmTasks('grunt-prerender');

grunt.initConfig({
  prerender: {
    options: {
      sitePath: 'http://www.mysite.com',
      urls: ['/', '/a/', '/b/'],  // and other paths ...
      dest: 'snapshots/',
      hashPrefix: '/'
    }
  },
});

grunt.registerTask('prerender',['prerender'])
};