var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var sequelize = require(__dirname+'/data/sequelize');
var restful = require('sequelize-restful');
var Bots = require(__dirname+'/data/models/bots');
var Transactions = require(__dirname+'/data/models/ripple_transactions');
var app = express();
var auditorCtrl = require(__dirname+'/controllers/auditor');
var passportAuth = require(__dirname + '/controllers/auth');
var router = new express.Router();

passport.use(passportAuth.adminBasic);

app.get('/audit/:invoice_id', auditorCtrl);

app.use(restful(sequelize, {}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static(__dirname+'/../public/'));



app.use('/', passport.authenticate('adminBasic'), { session: false }, app);
app.use(passport.initialize());



app.listen(3000);


