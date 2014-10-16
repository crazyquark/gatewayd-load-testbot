var RecordDeposits = require(__dirname+'/../lib/record_deposits');
var config = require(__dirname+'/../config/config.js');

var recordDeposits = new RecordDeposits({
  currency: config.get('CURRENCY'),
  interval: config.get('INTERVAL')
});

recordDeposits.start();

console.log('### Sending Deposits to gatewayd ###');
