var RippleRestClient = require('ripple-rest-client');
var async = require('async');

function PaymentBot(options){
  this.rippleRestClient = new RippleRestClient({
    account: 'rMsQ53ZybFVfys3BF8Sjf5XPRd3LdYDpC3',
    secret: 'shAkcHWfeUXs7FvVPCr6KwXPTmCbB'
  });
  this.interval = options.interval;
  this.payment = {
    amount: options.amount,
    currency: 'SFO',
    issuer: 'rf5Vk5vWzuSMKL5gdzbYKpJLtTfXBNprNg',
    recipient: 'rf5Vk5vWzuSMKL5gdzbYKpJLtTfXBNprNg'
  };
}

PaymentBot.prototype = {
  _buildPayment: function(callback) {
    var self = this;
    self.rippleRestClient.buildPayment(self.payment, function(error, payment){
      if (error) { return callback(error, null); }
      callback(null, payment.payments[0]);
    });
  },
  _makePayment: function(payment, callback) {
    this.rippleRestClient.sendAndConfirmPament(payment, function(error, response){
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
        console.log('err', error)
      } else {
        console.log('response', response)
        if (response.success) {
          setTimeout(function(){
            self.loop();
          }, self.interval)
        }
      }
    });
  },
  start: function(){
    this._loop(console.log);
  }
};

module.export = PaymentBot;

