var express = require('express');
var router = express.Router();
var d3 = require('d3');
//var d3pie = require('d3pie');


/* GET home page. */
router.get('/', function(req, res, next) {
	req.client.cmd('getnettotals', function(err, info, resHeaders){
	  if (err) return console.log(err);
	  var result = JSON.stringify(info).replace(/</g, '&lt;').replace(/>/g, '&gt;');
	  res.render('index', {"data" : info
	  });
	  //console.log(info);
  });
//  res.render('index', { title: 'Express' });
});

/*
router.get('/getinfo', function(req, res, next) {
	req.client.getBalance('*', 6, function(err, balance, resHeaders) {
	  if (err) return console.log(err);
	  console.log('Balance:', balance);
	});
  res.render('getinfo', { title: 'Express getinfo' });
});
*/

/*
router.get('/getinfo', function(req, res, next) {
	req.client.cmd('getinfo', function(err, balance, resHeaders){
	  if (err) return console.log(err);
	  console.log('Balance:', balance);
	});
  res.render('getinfo', { title: 'Express getinfo' });
});
*/


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
	req.client.cmd('getpeerinfo', function(err, info, resHeaders){
	  if (err) return console.log(err);
//	  console.log(info);
//	  var result = JSON.stringify(info).replace(/</g, '&lt;').replace(/>/g, '&gt;');
	  res.render('getpeerinfo', {"data" : info
	 // var options = {
	 //   noColor: true
	 // };
	 // res.render('getinfo', {"data" : prettyjson.render(info, {noColor: true})
	  });
//	  console.log(info);
  });
 // res.render('getinfo', { title: 'Express getinfo' });
});

module.exports = router;
