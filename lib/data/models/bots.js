var db = require(__dirname+'/../sequelize');
var Sequelize = require('sequelize');
var crypto = require('crypto');

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
  bot_invoice: {
    type: Sequelize.STRING
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  getterMethods: {
    bot_invoice: function () {
      return this.getDataValue('bot_invoice');
    }
  },
  setterMethods: {
    bot_invoice: function(value) {
      this.setDataValue('bot_invoice', crypto.randomBytes(32).toString('hex').toUpperCase());
    }
  }
});

Bots.initModel = function(forced) {
  return db.sync({force: forced});
};
module.exports = Bots;