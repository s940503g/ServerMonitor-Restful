var express = require('express');
var mongoClient = require('mongodb').MongoClient;
var events = require('events');


var app = express();
var eventEmitter = new events.EventEmitter();
var url = 'mongodb://localhost:27017/ServerMonitor';

var query = function (ip, date, callback) {
	mongoClient.connect(url, function (err, db) {
		var cursor = db.collection('TEST').find({ "ip":ip, "date":date });

		var results = new Array();
		cursor.each(function (err, doc) {
			if (err != null) { console.log(err); }
			if (doc != null) {
				results.push(doc);
			} else {
				db.close();
				callback(results);
			}
		});
	});
}

app.get('/api/:ip/:date', function (req, res) {
	ip = req.params.ip;
	date = req.params.date
	
	query(ip, date, function (data) {
		if (data != null) {
			res.end(data);
		} else {
			res.end("no data");
		}
	});
});

app.listen(8081, function () {
	console.log("ready port for 8081");
});
