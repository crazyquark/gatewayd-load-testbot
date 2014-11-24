var Sequelize = require('sequelize');
var requireAll = require('require-all-to-camel');
var models = requireAll(__dirname+'/models');
var chainer = new Sequelize.Utils.QueryChainer;

console.log(models);

models.sync = function(callback) {
  chainer.add(models.bots.sync());
  chainer.add(models.rippleTransactions.sync());

  chainer.run().then(function() {
    callback()
  }).error(function(error) {
    callback(error);
  });
};

module.exports = models;