//var ripple_lib = require('ripple-lib');
const Promise = require('bluebird');
const config = require(__dirname+'/../../config/config');
const GatewaydClient = require(__dirname+'/../../lib/gatewayd_client');
var Bots = require(__dirname+'/../../lib/data/models/bots');

function Auditor () {
  this._gatewaydClient = new GatewaydClient({
    gateway_url: config.get('GATEWAYD_URL'),
    username: config.get('GATEWAYD_CREDENTIALS').username,
    password: config.get('GATEWAYD_CREDENTIALS').password
  });
}

Auditor.prototype = {
  audit: function(invoice_id) {
    var _this = this;
    return new Promise(function(resolve, reject) {
      if (!invoice_id) {
        reject(new Error('BotNotFound'));
      } else {
        _this._queryGatewaydInstance(invoice_id)
          .then(function(transactions) {
            _this._queryBotsDatabase(invoice_id)
              .then(function(bot) {
                resolve({
                  bot_id: bot.id,
                  transactions_sent_by_bot: bot.payment_target_count,
                  transactions_received_by_gatewayd: transactions.length
                });
              })
              .error(function(error) {
                reject(new Error(error));
              });
          })
          .error(function(error) {
            reject(new Error(error));
          });
      }
    });
  },
  _queryGatewaydInstance: function (invoice_id) {
    var _this = this;
    return new Promise(function(resolve, reject) {
      _this._gatewaydClient.getRippleTransactions('invoice_id='+invoice_id)
        .then(resolve)
        .error(function(error) {
          reject(new Error(error));
        });
    });
  },
  _queryBotsDatabase: function (invoice_id) {
    var _this = this;
    return new Promise(function(resolve, reject) {
      Bots.find({
        where: {
          bot_invoice: invoice_id
        }
      })
      .then(function(bots) {
        resolve(bots);
      })
      .error(function(error) {
        reject(new Error(error));
      });
    })
  },

  _comparePaymentAmount: function(payments) {
    var _this = this;
    return new Promise(function(resolve, reject) {

    });

  }
};

module.exports = new Auditor;