var Sequelize = require('sequelize');
var models = require(__dirname+'/models/bots');
var chainer = new Sequelize.Utils.QueryChainer;

console.log(models);

models.sync = function(callback) {
  chainer.add(models.bots.sync());
  chainer.run().then(function() {
    callback()
  }).error(function(error) {
    callback(error);
  });
};

module.exports = models;