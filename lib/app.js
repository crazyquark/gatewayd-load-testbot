var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var sequelize = require(__dirname+'/data/sequelize');
var restful = require('sequelize-restful');
var Bots = require(__dirname+'/data/models/bots');
var Transactions = require(__dirname+'/data/models/ripple_transactions');
var app = express();
var router = new express.Router();
var auditorCtrl = require(__dirname+'/controllers/auditor');
var passportAuth = require(__dirname + '/controllers/auth');

passport.use(passportAuth.adminBasic);

app.use('/', express.static(__dirname+'/../public/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

router.get('/audit/:invoice_id', auditorCtrl);

app.use('/', passport.authenticate('adminBasic', { session: false }), restful(sequelize, {}));
app.use('/', passport.authenticate('adminBasic', { session: false }), router);

app.listen(3000);
