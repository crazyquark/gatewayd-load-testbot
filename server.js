var PaymentBot = require(__dirname+'/payment_bot');
var paymentBot = new PaymentBot({
  amount: 0.000000001,
  interval: 300
});

paymentBot.start();
console.log('### Sending payments in the  ###');