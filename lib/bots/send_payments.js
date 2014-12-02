var RippleRestClient = require('ripple-rest-client');
var Promise = require('bluebird');
var config = require(__dirname+'/../../config/config.js');
var Transactions = require(__dirname+'/../data/models/ripple_transactions');

PaymentBot = function(botInstance){
  var _this = this;
  _this.botInstance = botInstance;

  _this.rippleRestClient = new RippleRestClient({
    api: 'https://api.ripple.com/',
    account: config.get('BOT_ACCOUNT'),
    secret: config.get('BOT_ACCOUNT_SECRET')
  });
};

PaymentBot.prototype = {
  run: function(callback){
    this._loop(callback);
  },
  _loop: function(callback) {
    var _this = this;

    setTimeout(function() {
      _this._sendPayment(callback);
    }, _this.botInstance.interval);
  },
  _sendPayment: function(callback) {
    var _this = this;

    _this._buildPayment()
      .then(function(payment) {
        _this._makePayment(payment)
          .then(function(paymentResults){
            _this._recordTransaction(paymentResults)
              .then(function(recordedPayment) {
                _this._updateBotInstance(recordedPayment)
                  .then(function(botInstance){
                    callback(null, botInstance);
                    console.log('num_times: ', botInstance.dataValues.payment_sent_count, ' out of ', botInstance.dataValues.payment_target_count, '. every ', _this.botInstance.interval, ' milliseconds.');
                  })
                  .error(function(error) {
                    callback(error);
                    console.log('_recordTransaction error', error);
                  });
              })
              .error(function(error) {
                callback(error);
                console.log('_makePayment error', error);
              });
          })
          .error(function(error) {
            callback(error);
            console.log('caught error', error);
          });
      })      
      .error(function(error) {
        callback(error);
        console.log('_buildPayment error', error);
      });
  },
  _buildPayment: function() {
    var _this = this;
    var paymentObject = {
      amount: _this.botInstance.amount, // If amount is not specified, value will be random
      currency: _this.botInstance.currency,
      recipient: _this.botInstance.to_account,
      issuer: _this.botInstance.to_account

    };

    if (!_this.botInstance.amount) {
      paymentObject.amount = function () {
        return Math.random() / 1000
      }();
    }

    return new Promise(function(resolve, reject) {
      _this.rippleRestClient.buildPayment(paymentObject, function(error, payment) {
        if (error) {
          reject(error);
        } else {
          resolve(payment);
        }
      });
    });

  },
  _makePayment: function(payment) {
    var _this = this;
    var paymentObject = {};
    paymentObject.payment = payment.payments[0];
    paymentObject.payment.invoice_id = _this.botInstance.bot_invoice;

    if (!_this.botInstance.destination_tag) {
      paymentObject.payment.destination_tag = function () {
        return (Math.floor((Math.random() * 200) + 1)).toString();
      }();
    }

    return new Promise(function(resolve, reject) {
      _this.rippleRestClient.sendAndConfirmPayment(paymentObject, function(error, response){
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });

  },
  _recordTransaction: function (transaction) {
    var _this = this;
    return new Promise(function(resolve, reject) {
      if (!transaction) {
        reject(new Error('TransactionExpected'));
      }
      var random = function () {
        return (Math.floor((Math.random() * 200) + 1)).toString();
      };

      Transactions.create({
        data: { bot_id: _this.botInstance.id },
        memos: null,
        to_amount: transaction.destination_amount.value,
        from_amount: transaction.source_amount.value,
        to_currency: transaction.destination_amount.currency,
        from_currency: transaction.source_amount.currency,
        to_address_id: random(),
        from_address_id: random(),
        to_issuer: transaction.destination_amount.issuer,
        from_issuer: transaction.source_amount.issuer,
        state: 'incoming',
        direction: 'from-ripple',
        transaction_state: transaction.result,
        transaction_hash: transaction.hash,
        uid: null,
        external_transaction_id: null,
        invoice_id: transaction.invoice_id,
        ripple_addressId: null
      })
      .then(resolve)
      .error(reject);

    });
  },
  _updateBotInstance: function(payment) {
    var _this = this;
    return new Promise(function(resolve, reject) {
      if (payment) {
        if (_this.botInstance.payment_sent_count < _this.botInstance.payment_target_count) {
          _this.botInstance.payment_sent_count++;
          _this.botInstance.save().complete(function(error, botInstance) {
            if (error) {
              reject(error);
            } else {
              resolve(botInstance);
            }
          });
        } else {
          _this.botInstance.state = 'completed';
          _this.botInstance.save().complete(function(error, botInstance) {
            console.log(botInstance.dataValues.bot_type + ' bot #', botInstance.dataValues.id, ' complete!');
            if (error) {
              reject(error);
            } else {
              resolve(botInstance);
            }
          });
        }
      }
    });
  }
};

module.exports = PaymentBot;
