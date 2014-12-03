exports.up = function(db, callback) {
  db.addColumn('bots', 'username', {
    type: 'string'
  }, callback);

  db.addColumn('bots', 'key', {
    type: 'string'
  }, callback);
};

exports.down = function(db, callback) {
  db.removeColumn('bots', 'username', {
    type: 'string'
  }, callback);

  db.removeColumn('bots', 'key', {
    type: 'string'
  }, callback);
};
