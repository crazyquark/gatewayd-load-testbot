var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var util = require('util');

function BotManager () {
  this.bots = [
    'enqueue_outgoing_payments',
    'send_payments'
  ];
};

BotManager.prototype.start = function(bot_names) {
  var bots = bot_names || [];

  if (bots.length === 0) {
    bots = this.bots;
  }

  bots.forEach(function(name) {
    exec('pm2 --cron "0 * * * *" start '+ __dirname+'/../jobs/'+name+'.js --name '+name);
  });


  setTimeout(function(){
    var pm2 = spawn('pm2', ['list']);
    pm2.stdout.on('data', function (data) {
      util.puts(data.toString());
    });
  }, 3000);

};

BotManager.prototype.stop = function(){
  exec('pm2 kill');
};

module.exports = BotManager;
