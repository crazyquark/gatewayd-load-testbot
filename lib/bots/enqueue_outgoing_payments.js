var GatewaydClient = require(__dirname+'/../../lib/gatewayd_client');
var config = require(__dirname+'/../../config/config.js');
var Promise = require('bluebird');

function EnqueueOutgoingPayments (botInstance){
  this.botInstance = botInstance;
  this._gatewaydClient = new GatewaydClient({
    gateway_url: config.get('GATEWAYD_URL'),
    username: config.get('GATEWAYD_CREDENTIALS').username,
    password: config.get('GATEWAYD_CREDENTIALS').password
  });
}

EnqueueOutgoingPayments.prototype = {
  run: function(callback) {

    var _this = this;
    if (_this.botInstance.state === 'in_progress') {
      _this._loop();
    }
    callback(null, _this.botInstance);
  },
  _loop: function(){
    var _this = this;
    _this._buildPayment()
      .then(function(payment) {
        _this._enqueuePayment(payment)
          .then(function(payment) {
            _this._updateBotInstance()
              .then(function(bot){
                console.log('updated bot', bot.dataValues);
                if (_this.botInstance.payment_sent_count < _this.botInstance.payment_target_count) {
                  setTimeout(function(){
                    _this._loop();
                  }, 1000);
                } else {
                  _this.botInstance.state = 'completed';
                  _this.botInstance.save().complete(function(error, bot) {
                    if (!error) {
                      console.log('done!', bot);
                    }
                  });
                  
                }
              })
              .error(function(error) {
                console.log(error);
              });
          })
          .error(function(error) {
            console.log(error);
          });
      })
      .error(function(error) {
        console.log(error);
      });
  },
  _buildPayment: function() {
    var _this = this;
    var amount;
    var destinationTag;
    var paymentObject = {};

    if (!_this.botInstance.amount) {
      amount = function () {
        return Math.random() / 1000
      }();
    }

    if (!_this.botInstance.destination_tag) {
      destinationTag = function () {
        return (Math.floor((Math.random() * 100) + 1)).toString();
      }();
    }

    paymentObject.address = _this.botInstance.from_account;
    paymentObject.amount = amount;
    paymentObject.destinationTag = destinationTag;
    paymentObject.issuer = _this.botInstance.to_account;

    return new Promise(function(resolve, reject) {
      resolve(paymentObject);
    });
  },
  _enqueuePayment: function(paymentObject) {
    var _this = this;
    return new Promise(function(resolve, reject) {
      _this._gatewaydClient.enqueueOutgoingPayment(paymentObject)
        .then(resolve)
        .error(reject);
    });
  },

  _updateBotInstance: function() {
    var _this = this;
    _this.botInstance.payment_sent_count++;

    return new Promise(function(resolve, reject) {
      _this.botInstance.save().complete(function(error, bot) {
        if (error) {
          reject(error);
        } else {
          resolve(bot);
        }
      });
    })

  }



};

module.exports = EnqueueOutgoingPayments;
