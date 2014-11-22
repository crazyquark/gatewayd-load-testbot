var express = require('express');
var http = require('http');
var sequelize = require(__dirname+'/data/sequelize');
var restful = require('sequelize-restful');
var SQLRest = require('sequelize-rest-boilerplate');
var Bots = require(__dirname+'/data/models/bots');
var app = express();

var router = new SQLRest(Bots, 'bots');
app.use('/api', router);

app.listen(3000);

//setTimeout(function() {
//  http.createServer(app).listen(3000, function(){
//    console.log("Express server listening on port " + 3000)
//  });
//}, 2000);
