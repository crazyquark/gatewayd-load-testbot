var request = require('superagent');
var _ = require('lodash');
var Promise = require('bluebird');

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
  enqueueOutgoingPayment: function(payment){
    var self = this;
    var endpoint = 'v1/payments/outgoing';

    var options = {
      url: self.gateway_url + endpoint,
      json: payment
    };

    return new Promise(function(resolve, reject) {
      request
        .post(options.url)
        .auth(self.auth_options.auth.user, self.auth_options.auth.password)
        .send(options.json)
        .end(function(error, response){
          if (error) {
            reject(error);
          } else {
            resolve(response.body);
          }
        });
    });
  }
};

module.exports = GatewaydClient;
