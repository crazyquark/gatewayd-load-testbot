##Gatewayd load test bot

This software is a load simulator bot to test gatewayd applications. It runs processes that continuously make HTTP requests using gatewayd’s deposit endpoint (with basic auth) and [ripple-rest](https://github.com/ripple/ripple-rest)’s payment endpoint to simulate ‘outgoing’ and ‘incoming’ payments respectively. This bot application is fully configurable and easy to deploy. [ripple-rest](https://github.com/ripple/ripple-rest) should be running in parallel.

#### send_payment_bot.js

```
var paymentBot = new PaymentBot({
  from_account: config.get('BOT_ACCOUNT'),
  currency: config.get('CURRENCY'),
  secret: config.get('BOT_ACCOUNT_SECRET'),
  to_account: config.get('GATEWAY_ACCOUNT'),
  destination_tag: config.get('DESTINATION_TAG')
});

paymentBot.start(); 
```

####record_deposits_bot.js

```
var recordDeposits = new RecordDeposits({
  external_account_id: config.get('DESTINATION_TAG'),
  currency: config.get('CURRENCY')
});

recordDeposits.start();
```

##Installaton
```
$ git clone https://github.com/nerdylocks/gatewayd-load-testbot
$ npm install -G pm2
$ npm install
```

```
$ cd gatewayd-load-testbot
$ node server.js
```
