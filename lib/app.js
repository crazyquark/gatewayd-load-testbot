var express = require('express');
var http = require('http');
var sequelize = require(__dirname+'/data/sequelize');
var restful = require('sequelize-restful');
var Bots = require(__dirname+'/data/models/bots');
var Transactions = require(__dirname+'/data/models/ripple_transactions');
var app = express();

app.use(restful(sequelize, { /* options */ }))

app.listen(3000);
