module.exports = function (grunt) {

  grunt.initConfig({

    migrate: {
      options: {
        config: './lib/data/database.json',
        'migrations-dir': './lib/data/migrations',
        verbose: true,
        env: {
          DATABASE_URL: 'postgres://bots_user:password@localhost:5432/bots_db'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-db-migrate');
  grunt.registerTask('default', ['migrate']);

};