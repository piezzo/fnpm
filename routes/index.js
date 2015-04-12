var express = require('express');
var router = express.Router();
var config = require('config');
var serverType = config.get('serverType');
var rpcConfig = config.get('rpcConfig');

//load btcd and config
var btcd = require('btcd')('wss://' + rpcConfig.btcd.user + ':' + rpcConfig.btcd.password + '@localhost:8334/ws',
                           __dirname + '/rpc.cert');


/* GET home page. */
router.get('/', function(req, res, next) {
//	req.client.cmd('getnettotals', function(err, info, resHeaders){
//	  if (err) return console.log(err);
//	  var result = JSON.stringify(info).replace(/</g, '&lt;').replace(/>/g, '&gt;');
//	  res.render('index', {"data" : info
//	  });
//	  console.log(info);
//  });
btcd.getnettotals(function(err, hash){
  if (err) throw err;
  console.log(hash); // 000000000019d6689c085ae...
});
	res.render('index', { title: 'Express' })
});

// router.get('/getinfo', function(req, res, next) {
// 	req.client.cmd('getinfo', function(err, info, resHeaders){
// 	  if (err) return console.log(err);
// 	  var result = JSON.stringify(info).replace(/</g, '&lt;').replace(/>/g, '&gt;');
// 	  res.render('getinfo', {"data" : info
// 	  });
//   });
// });


router.get('/getpeerinfo', function(req, res, next) {
	switch (serverType) {
		case 'btcd':
			btcd.getpeerinfo(function(err, info, resHeaders) {
				if (err) return console.log(err);
			});
			break;
		case 'bitcoind':
			req.client.cmd('getpeerinfo', function(err, info, resHeaders) {
				if (err) return console.log(err);
			});
			break;
		case 'sampledata':
			{
				var info = config.rpcConfig.sampleData.getpeerinfo;
			};
	console.log("serverType: " + serverType + "info: " + info);
	res.render('getpeerinfo', {
		"data": info
	});
	//	break;
	}
});


module.exports = router;
