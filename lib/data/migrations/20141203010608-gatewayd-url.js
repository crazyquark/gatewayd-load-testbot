exports.up = function(db, callback) {
  db.addColumn('bots', 'gatewayd_url', {
    type: 'string'
  }, callback);
};

exports.down = function(db, callback) {
  db.removeColumn('bots', 'gatewayd_url', {
    type: 'string'
  }, callback);
};
