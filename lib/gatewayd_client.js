var request = require('superagent');
var _ = require('lodash');
var Promise = require('bluebird');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var GatewaydClient = function(options){
  var _this = this;
  _this.gateway_url = options.gateway_url;

  _this.auth = {
    user: options.username,
    password: options.password
  };

};

GatewaydClient.prototype = {
  enqueueOutgoingPayment: function(payment){
    var _this = this;
    var endpoint = 'v1/payments/outgoing';

    var gateway_url = _this.gateway_url + endpoint;

    return new Promise(function(resolve, reject) {
      request
        .post(gateway_url)
        .auth(_this.auth.user, _this.auth.password)
        .send(payment)
        .end(function(error, response){
          if (error) {
            reject(error);
          } else {
            resolve(response);
          }
        });
    });
  },
  getRippleTransactions: function(query){
    var _this = this;
    var endpoint = 'v1/ripple_transactions?'+query;
    var gateway_url = _this.gateway_url + endpoint;
    return new Promise(function(resolve, reject) {
      request
        .get(gateway_url)
        .auth(_this.auth.user, _this.auth.password)
        .end(function(error, response){
          if (error) {
            reject(error);
          } else {
            resolve(response.body.ripple_transactions);
          }
        });
    });
  }
};

module.exports = GatewaydClient;
