var nconf = require('nconf');

nconf
  .file({ file: __dirname+'/config.json' })
  .env();

nconf.defaults({
  "FROM_ACCOUNT": null,
  "TO_ACCOUNT": null,
  "CURRENCY": null,
  "DESTINATION_TAG": null,
  "INTERVAL": null
});

module.exports = nconf;