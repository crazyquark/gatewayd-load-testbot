var RippleRestClient = require('ripple-rest-client');
var async = require('async');

var TEST_SECRET = process.env.TEST_SECRET;

PaymentBot = function(options){
  this.rippleRestClient = new RippleRestClient({
    account: 'rMsQ53ZybFVfys3BF8Sjf5XPRd3LdYDpC3',
    secret: TEST_SECRET
  });
  this.interval = options.interval;
  this.payment = {
    amount: options.amount || Math.random() / 10000,
    currency: 'SFO',
    recipient: 'rf5Vk5vWzuSMKL5gdzbYKpJLtTfXBNprNg'
  };
}

PaymentBot.prototype = {
  _buildPayment: function(callback) {
    var self = this;
    self.rippleRestClient.buildPayment(self.payment, function(error, payment){
      if (error) {
        return callback(error, null);
      } else if (payment.success) {
        var paymentObject = {
          payment: payment.payments[0]
        };
        paymentObject.payment.destination_tag = '5';
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
        console.log('error', error)
      } else {
          setTimeout(function(){
            self._loop();
            console.log('sent', response.destination_amount.value);
          }, self.interval);
      }
    });
  },
  start: function(){
    this._loop();
  }
};

module.exports = PaymentBot;

