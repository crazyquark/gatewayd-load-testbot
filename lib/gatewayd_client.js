var request = require('request');
var _ = require('underscore-node');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var GatewaydClient = function(options){
  var self = this;
  self.gateway_url = options.gateway_url;

  self.auth_options = {
    auth: {
      user: options.username,
      password: options.password
    },
    rejectUnhauthorized : false
  };

};

GatewaydClient.prototype = {
  _auth: function (options) {
    var self = this;
    return _.extend(options, self.auth_options);
  },
  recordDeposit: function(deposit, callback){
    var self = this;
    var endpoint = 'v1/payments/outgoing';

    var options = {
      url: self.gateway_url + endpoint,
      json: deposit
    };

    request.post(self._auth(options), function(error, response, body){
      if (error) {
        return callback(error, null);
      }
      callback(null, body);
    });
  }
};

module.exports = GatewaydClient;
