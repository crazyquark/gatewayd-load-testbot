var Sequelize = require('sequelize');
var db_config = require(__dirname+'/database.json').dev;

var dbOptions = {
  dialect: db_config['dialect'],
  host: db_config['host'],
  port: db_config['port'],
  logging: db_config['logging']
};

var db = new Sequelize('bots_db', 'bots_user', 'password', dbOptions);

module.exports = db;