var PaymentBot = require(__dirname+'/bot_processes/payment');

var paymentBot = new PaymentBot();
paymentBot.start();

console.log('### Sending payments to specified account  ###');