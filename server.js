var PaymentBot = require(__dirname+'/payment_bot');
var paymentBot = new PaymentBot({
  amount: 0.00000000000000000001,
  interval: 300
});

paymentBot.start();