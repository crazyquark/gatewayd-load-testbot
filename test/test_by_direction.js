var Bots = require(__dirname+'/../lib/data/models/bots.js');

Bots
  .create({
    from_account: 'rMsQ53ZybFVfys3BF8Sjf5XPRd3LdYDpC3',
    to_account: 'r4p4gZaWSq8Cs1d8mn1jaGqVU1HUns1ek3',
    currency: 'GWD',
    payment_target_count: 7,
    payment_sent_count: 0,
    state: 'in_progress',
    bot_type: 'outgoing',
    interval: 3000
  }).then(function(payment) {
    console.log(payment.dataValues);
  }).error(function(error) {
    console.log(error);
  });

Bots
  .create({
    from_account: 'rMsQ53ZybFVfys3BF8Sjf5XPRd3LdYDpC3',
    to_account: 'r4p4gZaWSq8Cs1d8mn1jaGqVU1HUns1ek3',
    currency: 'GWD',
    payment_target_count: 9,
    payment_sent_count: 0,
    state: 'in_progress',
    bot_type: 'incoming',
    interval: 3000
  }).then(function(payment) {
    console.log(payment.dataValues);
  }).error(function(error) {
    console.log(error);
  });