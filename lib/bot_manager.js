var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var util = require('util');
var config = require(__dirname+'/../config/config');


function BotManager () {
  this.bots = [
    'record_deposits_bot',
    'send_payment_bot'
  ];
};

BotManager.prototype.start = function(bot_names) {
  var bots = bot_names || [];

  if (bots.length === 0) {
    bots = this.bots;
  }

  if (config.get('RIPPLE_REST_PATH')) {
    var ripple_rest_path = config.get('RIPPLE_REST_PATH');
    exec('pm2 --cron "0 * * * *" start '+ripple_rest_path+'/server.js --name ripplerest');
  }
  
  bots.forEach(function(name) {
    exec('pm2 --cron "0 * * * *" start '+ __dirname+'/../bots/'+name+'.js --name '+name);
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
