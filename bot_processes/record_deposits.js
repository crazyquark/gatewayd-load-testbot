var GatewaydClient = require(__dirname+'/../lib/gatewayd_client');
var config = require(__dirname+'/../config/config.js');

function RecordDeposit (options){
  this.options = options || {};
  this._gatewaydClient = new GatewaydClient({
    gateway_url: config.get('GATEWAYD_URL'),
    username: config.get('GATEWAYD_CREDENTIALS').username,
    password: config.get('GATEWAYD_CREDENTIALS').password
  });
}

RecordDeposit.prototype = {
  _record: function(callback){
    var self = this;
    var amount = function () {
      return Math.random() / 1000
    }();

    var deposit = {
      external_account_id: self.options.external_account_id,
      amount: amount,
      currency: self.options.currency
    };

    self._gatewaydClient.recordDeposit(deposit, function(error, response){
      if (error) {
        return callback(error, null);
      }

      callback(null, response);

    });
  },
  _loop: function(){
    var self = this;
    self._record(function(error, response){
      if (error) {
        console.log('deposit:error', error);
        return setTimeout(function(){ self._record() }, 4000);
      }

      if (self.options.internal) {
        setTimeout(function(){ self._loop() }, self.options.interval);
      } else {
        setImmediate(function(){ self._loop() });
      }

      if (response && response.deposit) {
        console.log('deposit:success', response.deposit.amount);
      }

    })
  },
  start: function(){
    this._loop();
  }
};

module.exports = RecordDeposit;
