exports.up = function(db, callback) {
		db.createTable('ripple_transactions', {
			id: { 
	    type: 'int', 
	    primaryKey: true, 
	    autoIncrement: true 
	  },
	  to_address_id: { 
	    type: 'int',
	    allowNull: false
	    
	  },
	  from_address_id: { 
	    type: 'int',
	    allowNull: false
	    
	  },
	  to_amount: { 
	    type: 'decimal',
	    allowNull: false
	    
	  },
	  to_currency: { 
	    type: 'string',
	    allowNull: false
	    
	  },
	  to_issuer: { 
	    type: 'string',
	    allowNull: true
	  },
	  from_amount: { 
	    type: 'decimal',
	    allowNull: false
	    
	  },
	  from_currency: { 
	    type: 'string',
	    allowNull: false
	    
	  },
	  from_issuer: { 
	    type: 'string',
	    allowNull: true
	  },
	  transaction_state:{ 
	    type: 'string',
	    allowNull: true
	  },
	  transaction_hash: { 
	    type: 'string',
	    allowNull: true
	  },
	  uid: {
	    type: 'string',
	    unique: true
	  },
	  data: {
	    type: 'string',
	    allowNull: true
	  },
	  state: {
	    type: 'string',
	    allowNull: true
	  },
	  external_transaction_id: {
	    type: 'int',
	    allowNull: true
	  },
	  invoice_id: {
	    type: 'string',
	    allowNull: true
	  },
	  memos: {
	    type: 'text',
	    allowNull: true
	  },
	  direction: {
	    type: 'string'
	  },
	  createdAt: { 
	  	type: 'datetime', 
	  	notNull: true 
	  },
    updatedAt: { 
    	type: 'datetime' 
    }
	}, callback);
};

exports.down = function(db, callback) {
	db.dropTable('ripple_transactions', callback);
};
