var nconf = require('nconf');

nconf
  .file({ file: __dirname+'/config.json' })
  .env();

nconf.defaults({
  "BOT_ACCOUNT": null,
  "GATEWAY_ACCOUNT": null,
  "CURRENCY": null,
  "DESTINATION_TAG": null,
  "INTERVAL": null,
  "AMOUNT": null,
  "BOT_ACCOUNT_SECRET": null,
  "GATEWAYD_URL": null,
  "GATEWAYD_CREDENTIALS": {
    "username": null,
    "password": null
  },
  "RIPPLE_REST_PATH": null,
  "KEY": null
});

module.exports = nconf;