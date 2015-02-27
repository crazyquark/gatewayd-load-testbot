var db = require('../sequelize');
var Sequelize = require('sequelize');

var RippleTransactions = db.define('ripple_transactions', {
  id: { 
    type: Sequelize.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  to_address_id: { 
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      
      isInt: true
    }
  },
  from_address_id: { 
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      
      isInt: true
    }
  },
  to_amount: { 
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      
      isDecimal: true
    }
  },
  to_currency: { 
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      
      isAlphanumeric: true
    }
  },
  to_issuer: { 
    type: Sequelize.STRING,
    allowNull: true
  },
  from_amount: { 
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      isDecimal: true
    }
  },
  from_currency: { 
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isAlphanumeric: true
    }
  },
  from_issuer: { 
    type: Sequelize.STRING,
    allowNull: true
  },
  transaction_state:{ 
    type: Sequelize.STRING,
    allowNull: true
  },
  transaction_hash: { 
    type: Sequelize.STRING,
    allowNull: true
  },
  uid: {
    type: Sequelize.STRING,
    unique: true
  },
  data: {
    type: Sequelize.STRING,
    allowNull: true
  },
  state: {
    type: Sequelize.STRING,
    allowNull: true
  },
  external_transaction_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
    validate: {
      isInt: true
    }
  },
  invoice_id: {
    type: Sequelize.STRING,
    allowNull: true
  },
  memos: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  direction: {
    type: Sequelize.STRING,
    validate: {
      isIn: [['to-ripple', 'from-ripple']]
    }
  }
}, {
  getterMethods: {
    data: function () {
      try {
        return JSON.parse(this.getDataValue('data'));
      } catch(e) {
        return this.getDataValue('data');
      }
    },
    memos: function () {
      try {
        return JSON.parse(this.getDataValue('memos'));
      } catch(e) {
        return this.getDataValue('memos');
      }
    },
    to_amount: function () {
      try {
        return parseFloat(this.getDataValue('to_amount'));
      } catch(e) {
        return this.getDataValue('to_amount');
      }
    },
    from_amount: function () {
      try {
        return parseFloat(this.getDataValue('from_amount'));
      } catch(e) {
        return this.getDataValue('from_amount');
      }
    }
  },
  setterMethods: {
    to_issuer: function(value) {
      if (value === '') {
        this.setDataValue('to_issuer', undefined);
      } else {
        this.setDataValue('to_issuer', value);
      }
    },
    from_issuer: function(value) {
      if (value === '') {
        this.setDataValue('from_issuer', undefined);
      } else {
        this.setDataValue('from_issuer', value);
      }
    },
    data: function (value) {
      this.setDataValue('data', JSON.stringify(value));
    },
    invoice_id: function (value) {
      if (value) {
        this.setDataValue('invoice_id', value.toUpperCase());
      }
    },
    memos: function (value) {
      this.setDataValue('memos', JSON.stringify(value));
    }
  }
});

RippleTransactions.initModel = function(forced) {
  return db.sync({force: forced});
};

module.exports = RippleTransactions;