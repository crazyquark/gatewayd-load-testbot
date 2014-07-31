var RippleRestClient = require('ripple-rest-client');
var async = require('async');

PaymentBot = function(options){
  var self = this;
  self.options = options || {};

  self.payment = {
    amount: self.options.amount, // If amount is not specified, value will be random
    currency: self.options.currency,
    recipient: self.options.to_account
  };

  self.rippleRestClient = new RippleRestClient({
    account: self.options.from_account,
    secret: self.options.secret
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
        paymentObject.payment = payment.payments[0];
        paymentObject.payment.destination_tag = self.options.destination_tag ;
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
        console.log('error:', error);
        setTimeout(function() { self._loop() }, 2000);
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
