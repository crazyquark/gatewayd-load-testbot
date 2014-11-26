exports.up = function(db, callback) {
  db.addColumn('bots', 'bot_invoice', {
    type: 'string'
  }, callback);
};

exports.down = function(db, callback) {
  db.removeColumn('bots', 'bot_invoice', {
    type: 'string'
  }, callback);
};

