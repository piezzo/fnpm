var express = require('express');
var router = express.Router();
var config = require('config');
var serverType = config.get('serverType');
var rpcConfig = config.get('rpcConfig');
var colors = config.get('colors');


/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/getpeerinfo', function(req, res, next) {
	switch (serverType) {
		case 'btcd':
			btcd.getpeerinfo(function(err, info, resHeaders) {
				if (err) return console.log(err);
				btcd.getnettotals(function(err, nettotals, resHeaders) {
					if (err) return console.log(err);
					var maxTransferred = 0;
					for (var i = 0; i < info.length; i++){
						maxTransferred = Math.max(maxTransferred, (info[i].bytessent + info[i].bytesrecv));
					};
					res.render('getpeerinfo', {
						"data": info,
						"colors": colors,
						"nettotals": nettotals,
						"maxTransferred": maxTransferred
					});
				});
			});
			break;
		case 'bitcoind':
			req.client.cmd('getpeerinfo', function(err, info, resHeaders) {
				if (err) return console.log(err);
				req.client.cmd('getnettotals', function(err, nettotals, resHeaders) {
					if (err) return console.log(err);
					var maxTransferred = 0;
					for (var i = 0; i < info.length; i++){
						maxTransferred = Math.max(maxTransferred, (info[i].bytessent + info[i].bytesrecv));
					};
					res.render('getpeerinfo', {
						"data": info,
						"colors": colors,
						"nettotals": nettotals,
						"maxTransferred": maxTransferred
					});
				});
						});
			// var nettotals = config.rpcConfig.sampleData.getnettotals;

			break;
		case 'sampledata':
			{
				console.log("acessing sampledata...");
				var info = config.rpcConfig.sampleData.getpeerinfo;
				var nettotals = config.rpcConfig.sampleData.getnettotals;
				var maxTransferred = 0;
				for (var i = 0; i < info.length; i++){
					maxTransferred = Math.max(maxTransferred, (info[i].bytessent + info[i].bytesrecv));
				};
			};
	res.render('getpeerinfo', {
		"data": info,
		"colors": colors,
		"nettotals": nettotals,
		"maxTransferred": maxTransferred
	});
	}
});


module.exports = router;
