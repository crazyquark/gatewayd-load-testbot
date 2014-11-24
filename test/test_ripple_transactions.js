var Txns = require(__dirname+'/../lib/data/models/ripple_transactions.js');

Txns
.create({
    data: null,
    memos: null,
    to_amount: 0.0008742091518361122,
    from_amount: 0.0008742091518361122,
    to_currency: 'GWD',
    from_currency: 'GWD',
    to_address_id: 70,
    from_address_id: 2,
    to_issuer: 'r4p4gZaWSq8Cs1d8mn1jaGqVU1HUns1ek3',
    from_issuer: 'r4p4gZaWSq8Cs1d8mn1jaGqVU1HUns1ek3',
    state: 'outgoing',
    direction: 'to-ripple',
    transaction_state: null,
    transaction_hash: null,
    uid: null,
    external_transaction_id: null,
    invoice_id: null,
    ripple_addressId: null
  }).then(function(payment) {
    console.log(payment.dataValues);
  }).error(function(error) {
    console.log(error);
  });
