var Bots = require(__dirname+'/../lib/data/models/bots.js');

Bots
  .create({
    from_account: 'rMsQ53ZybFVfys3BF8Sjf5XPRd3LdYDpC3',
    to_account: 'r4p4gZaWSq8Cs1d8mn1jaGqVU1HUns1ek3',
    currency: 'GWD',
    payment_target_count: 5,
    payment_sent_count: 0,
    state: 'in_progress',
    bot_type: 'outgoing',
    interval: 5000
  }).then(function(payment) {
    console.log(payment);
  }).error(function(error) {
    console.log(error);
  });