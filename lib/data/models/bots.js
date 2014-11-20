var db = require(__dirname+'/../sequelize');
var Sequelize = require('sequelize');

var Bots = db.define('bots', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  interval: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  bot_type: {
    type: Sequelize.STRING,
    allowNull: false
  },
  from_account: {
    type: Sequelize.STRING,
    allowNull: false
  },
  to_account: {
    type: Sequelize.STRING,
    allowNull: false
  },
  destination_tag: {
    type: Sequelize.INTEGER
  },
  currency: {
    type: Sequelize.STRING,
    allowNull: false
  },
  amount: {
    type: Sequelize.INTEGER
  },
  payment_target_count: {
    type: Sequelize.INTEGER
  },
  payment_sent_count: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Bots;