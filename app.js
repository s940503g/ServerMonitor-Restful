var express = require('express');
var mongoClient = require('mongodb').MongoClient;
var events = require('events');


var app = express();
var eventEmitter = new events.EventEmitter();
var url = 'mongodb://localhost:27017/ServerMonitor';


app.get('/api/:ip/:date', function (req, res) {
	ip = req.params.ip;
	date = req.params.date
	
});

