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

router.get('/getinfo', function(req, res, next) {
	req.client.cmd('getinfo', function(err, info, resHeaders){
	  if (err) return console.log(err);
	  var result = JSON.stringify(info).replace(/</g, '&lt;').replace(/>/g, '&gt;');
	  res.render('getinfo', {"data" : info
	  });
//	  console.log(info);
  });
 // res.render('getinfo', { title: 'Express getinfo' });
});


router.get('/getpeerinfo', function(req, res, next) {
	switch (serverType){
		case 'btcd': {
		btcd.getpeerinfo(function(err, info, resHeaders){
		  if (err) return console.log(err);
	//	  console.log(info);
	//	  var result = JSON.stringify(info).replace(/</g, '&lt;').replace(/>/g, '&gt;');
		  console.log('btcd: ' + info);
		  res.render('getpeerinfo', {"data" : info
		  });
	//	break;
})};

	case 'bitcoind': {
		req.client.cmd('getpeerinfo', function(err, info, resHeaders){
		  if (err) return console.log(err);
	//	  console.log(info);
	//	  var result = JSON.stringify(info).replace(/</g, '&lt;').replace(/>/g, '&gt;');
		  console.log('bitcoind: ' + info);
		  res.render('getpeerinfo', {"data" : info
		  });
	  })};
	//	break;
	case 'sampleData': {
		var info = config.rpcConfig.sampleData.getpeerinfo;
		console.log('bitcoind: ' + info);
		res.render('getpeerinfo', {"data" : info
		})};
	
	}

 // res.render('getinfo', { title: 'Express getinfo' });
});

module.exports = router;
