var express = require('express');
var mongoClient = require('mongodb').MongoClient;
var events = require('events');


var app = express();
var eventEmitter = new events.EventEmitter();
var url = 'mongodb://localhost:27017/ServerMonitor';

var query = function (ip, date, callback) {
	mongoClient.connect(url, function (err, db) {
		var cursor = db.collection('TEST').find({ 'ip':ip, 'date':date });

		var results = new Array();
		cursor.each(function (err, doc) {
			if (err != null) { console.log(err); }
			if (doc != null) {
				results.push(doc);
			} else {
				db.close();
//				callback(doc);
				callback(results);
			}
		});
	});
}

app.get('/api/:ip/:date', function (req, res) {
	var ip = req.params.ip; // e.g. 52-32-63-252
	var date = req.params.date; // e.g. 2016-08-20


	console.log("query by "+ipFormate(ip)+" "+date);	

	query(ipFormate(ip), date, function (data) {
		if (data != null) {
			res.end(JSON.stringify(data));
		} else {
			res.end("no data");
		}
	});

});

function ipFormate (ip) {
	ip = ip.replace(/-/g, '.');
	return ip;
}
app.listen(8080, function () {
	console.log("ready port for 8080");
});
