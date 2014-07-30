var RippleRestClient = require('ripple-rest-client');
var async = require('async');
var _ = require('underscore-node');

var TEST_SECRET = process.env.TEST_SECRET;

PaymentBot = function(options){

  this.options = options || {};

  this.payment = {
    amount: this.options.amount, // If amount is not specified, value will be random
    currency: this.options.currency || 'SFO',
    recipient: this.options.to_address || 'rf5Vk5vWzuSMKL5gdzbYKpJLtTfXBNprNg'
  };

  this.rippleRestClient = new RippleRestClient({
    account: 'rMsQ53ZybFVfys3BF8Sjf5XPRd3LdYDpC3',
    secret: TEST_SECRET
  });
};

PaymentBot.prototype = {
  _buildPayment: function(callback) {
    var self = this;

    if (!self.options.amount) {
      self.payment.amount = function () {
        return Math.random() / 1000
      }();
    }

    self.rippleRestClient.buildPayment(self.payment, function(error, payment) {
      if (error) {
        return callback(error, null);
      } else if (payment.success) {
        var paymentObject = {};
        paymentObject.payment = payment.payments[0]
        paymentObject.payment.destination_tag = self.options.destination_tag || '5';
        callback(null, paymentObject);
      } else {
        callback(payment.message, null);
      }
    });
  },
  _makePayment: function(payment, callback) {
    this.rippleRestClient.sendAndConfirmPayment(payment, function(error, response){
      if (error) { return callback(error, null); }
      callback(null, response);
    });
  },
  _buildAndPay: function(callback){
    var self = this;
    async.waterfall([
      function(next) {
        self._buildPayment(next);
      },
      function(payment, next) {
        self._makePayment(payment, next);
      }
    ], callback);
  },
  _loop: function(){
    var self = this;
    self._buildAndPay(function(error, response){
      if (error) {
        return console.log('error', error)
      }

      if (self.options.interval) {
        setTimeout(function() { self._loop() }, self.options.interval);
      } else {
        setImmediate(function() { self._loop() });
      }

      console.log('SENT', response.destination_amount.value);

    });
  },
  start: function(){
    this._loop();
  }
};

module.exports = PaymentBot;
