var express = require('express');
var router = express.Router();
var config = require('config');
var serverType = config.get('serverType');
var rpcConfig = config.get('rpcConfig');
var colors = config.get('colors');

//load btcd and config
//var btcd = require('btcd')('wss://' + rpcConfig.btcd.user + ':' + rpcConfig.btcd.password + '@localhost:8334/ws',
//                           __dirname + '/rpc.cert');


/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' })
});

router.get('/getpeerinfo', function(req, res, next) {
	switch (serverType) {
		case 'btcd':
			btcd.getpeerinfo(function(err, info, resHeaders) {
				if (err) return console.log(err);
				btcd.getnettotals(function(err, nettotals, resHeaders) {
					if (err) return console.log(err);
					res.render('getpeerinfo', {
						"data": info,
						"colors": colors,
						"nettotals": nettotals
					});
				});
			});
			break;
		case 'bitcoind':
			req.client.cmd('getpeerinfo', function(err, info, resHeaders) {
				if (err) return console.log(err);
				req.client.cmd('getnettotals', function(err, nettotals, resHeaders) {
					if (err) return console.log(err);
					// console.log(info);
					// console.log(colors);
					// console.log(nettotals);
					res.render('getpeerinfo', {
						"data": info,
						"colors": colors,
						"nettotals": nettotals
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
			};
	res.render('getpeerinfo', {
		"data": info,
		"colors": colors,
		"nettotals": nettotals
	});
	}
});


module.exports = router;
