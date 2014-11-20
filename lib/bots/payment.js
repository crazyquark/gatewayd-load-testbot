var RippleRestClient = require('ripple-rest-client');
var async = require('async');

PaymentBot = function(options){
  var self = this;
  self.options = options || {};

  self.payment = {
    amount: self.options.amount, // If amount is not specified, value will be random
    currency: self.options.currency,
    recipient: self.options.to_account,
    issuer: self.options.issuer
  };

  self.rippleRestClient = new RippleRestClient({
    api: 'https://api.ripple.com/',
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
        //paymentObject.payment.invoice_id = '03AC674216F3E15C761EE1A5E255F067953623C8B388B4459E13F978D7C846F4';
        if (!self.options.destination_tag) {
          paymentObject.payment.destination_tag = function () {
            return (Math.floor((Math.random() * 200) + 1)).toString();
          }();
        } else {
          paymentObject.payment.destination_tag = self.options.destination_tag;
        }

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
        return setTimeout(function() { self._loop() }, 5000);
      }

      if (self.options.interval) {
        setTimeout(function() { self._loop() }, 5000);
      } else {
        setImmediate(function() { self._loop() });
      }

      console.log('SENT', response.destination_amount.value);

    });
  },
  start: function(){
    console.log('starting...');
    this._loop();
  }
};

module.exports = PaymentBot;
