var OutgoingPaymentsBot = require(__dirname+'/../../lib/bots/enqueue_outgoing_payments');
var config = require(__dirname+'/../../config/config.js');
var Bots = require(__dirname+'/../data/models/bots.js');
var Worker = require('sql-mq-worker');

var worker = new Worker({
  Class: Bots,
  timeout: 3000,
  predicate: {
    where: {
      bot_type: 'outgoing',
      state: 'in_progress'
    }
  },
  job: function(botInstance, callback) {
    var outgoingPaymentsBot = new OutgoingPaymentsBot(botInstance);
    outgoingPaymentsBot.run(callback);
  }
});

worker.start();

console.log('### enqueuing outgoing payments to gatewayd ###');
