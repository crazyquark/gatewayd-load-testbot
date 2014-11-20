exports.up = function(db, callback) {
  db.createTable('bots', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true
    },
    interval: {
      type: 'int',
      allowNull: false
    },
    bot_type: {
      type: 'string',
      allowNull: false
    },
    from_account: {
      type: 'string',
      allowNull: false
    },
    to_account: {
      type: 'string',
      allowNull: false
    },
    destination_tag: {
      type: 'int'
    },
    currency: {
      type: 'string',
      allowNull: false
    },
    amount: {
      type: 'int'
    },
    payment_target_count: {
      type: 'int'
    },
    payment_sent_count: {
      type: 'int',
      allowNull: false
    },
    state: {
      type: 'string',
      allowNull: false
    },
    createdAt: {
      type: 'datetime',
      allowNull: false
    },
    updatedAt: {
      type: 'datetime',
      allowNull: false
    }
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('bots', callback);
};
