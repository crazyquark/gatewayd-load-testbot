var IncomingPaymentsBot = require(__dirname+'/../../lib/bots/send_payments');
var Bots = require(__dirname+'/../data/models/bots.js');
var Worker = require('sql-mq-worker');

var worker = new Worker({
  Class: Bots,
  timeout: 3000,
  predicate: {
    where: {
      state: 'in_progress',
      bot_type: 'incoming'
    }
  },
  job: function(botInstance, callback) {
    var incomingPaymentsBot = new IncomingPaymentsBot(botInstance);
    incomingPaymentsBot.run(callback);
  }
});

worker.start();

console.log('### Sending payments to specified account  ###');