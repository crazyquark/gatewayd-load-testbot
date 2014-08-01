var RecordDeposits = require(__dirname+'/bot_processes/record_deposits');
var config = require(__dirname+'/config/config.js');

var recordDeposits = new RecordDeposits({
  external_account_id: config.get('DESTINATION_TAG'),
  currency: config.get('CURRENCY')
});

recordDeposits.start();

console.log('### Sending Deposits to gatewayd ###');