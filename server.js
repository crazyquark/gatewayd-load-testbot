var PaymentBot = require(__dirname+'/payment_bot');
var paymentBot = new PaymentBot({
  interval: 300
});

paymentBot.start();
console.log('### Sending payments in the  ###');