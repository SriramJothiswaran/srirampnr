'use strict';

var express = require("express");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const bodyParser = require('body-parser');
const request = require("request");
const fs = require('fs');
var moment = require('moment');
moment().format();
var cloudscraper = require('cloudscraper');
const TelegramBot = require('node-telegram-bot-api');
const token = '543856122:AAHWgF_5OvoTJ17T2nQY-f8FR_NSNDb4ye0';
const bot = new TelegramBot(token, {polling: true});
const download = require('download');
var to_json = require('xmljson').to_json;

var port = process.env.PORT;
// var port = 5000;

app.set('views', __dirname + '/views');
app.set('view engine', "ejs");
app.engine('ejs', require('ejs').__express);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const btcUrl = "https://api.coinmarketcap.com/v1/ticker/bitcoin/?convert=INR";
const xrpUrl = "https://api.coinmarketcap.com/v1/ticker/ripple/?convert=INR";
const btcxUrl = "https://api.btcxindia.com/ticker/";
const ethUrl = "https://api.coinmarketcap.com/v1/ticker/ethereum/?convert=INR";
var btcvalue = null;
var xrpvalue = null;
var ethvalue = null;
var btcxvalue = null;
var onedayBtc = null;
var onedayXrp = null;
var onedayEth = null;
var btcTimeStamp = null;
var ethTimeStamp = null;
var xrpTimeStamp = null;
var btcxTimeStamp = null;

function getStatus(req, res, next) {

  request.get(btcUrl, function(err, res, body) {
    if (err) {} else {
      btcvalue = JSON.parse(body)[0];
      btcTimeStamp = moment.unix(btcvalue.last_updated).utcOffset("+05:30").format("Do MMMM YYYY, HH:mm");
      onedayBtc = btcvalue["24h_volume_inr"];

    }

  });
  request.get(xrpUrl, function(err, res, body) {
    if (err) {} else {
      xrpvalue = JSON.parse(body)[0];
      xrpTimeStamp = moment.unix(xrpvalue.last_updated).utcOffset("+05:30").format("Do MMMM YYYY, HH:mm");
      onedayXrp = xrpvalue["24h_volume_inr"];

    }

  });
  request.get(ethUrl, function(err, res, body) {
    if (err) {} else {
      ethvalue = JSON.parse(body)[0];
      ethTimeStamp = moment.unix(ethvalue.last_updated).utcOffset("+05:30").format("Do MMMM YYYY, HH:mm");
      onedayEth = ethvalue["24h_volume_inr"];
    }

  });

  cloudscraper.get(btcxUrl, function(error, response, body) {
    if (error) {
      console.log('Error occurred');
      console.log(error);
    } else {

      if (response.headers["content-type"] == 'application/json') {
        // console.log(body);
        btcxvalue = JSON.parse(body);
      }
      // console.log(btcxvalue);

      // next();
      // setTimeout(function(){
      //   next();
      // }, 3000);
    }
  });
  // request.get(btcxUrl,function(err,res,body){
  //    if(err){
  //
  //    }else{
  //        btcxvalue = JSON.parse(body);
  //        console.log(btcxvalue);
  //    }
  //
  //
  //
  // });

  next();

}

let telRipple = (next) => {
  console.log('waiting');

  request.get(xrpUrl, function(err, res, body) {
    if (err) {} else {
      xrpvalue = JSON.parse(body)[0];
      xrpTimeStamp = moment.unix(xrpvalue.last_updated).utcOffset("+05:30").format("Do MMMM YYYY, HH:mm");
      onedayXrp = xrpvalue["24h_volume_inr"];
      next(xrpvalue);

    }

  });
};

app.get("/", getStatus, function(req, res) {
  // request('https://criclive-api.herokuapp.com/', function (error, response, body) {
  //   console.log('error:', error);  Print the error if one occurred
  //   console.log('statusCode:', response && response.statusCode);  Print the response status code if a response was received
  //   var testdata = JSON.parse(body);
  //
  //    console.log(testdata.data[0].category);
  //   for(var i=0; i<testdata.data.length; i++){
  //     if(testdata.data[i].category == "Indian Premier League"){
  //         console.log(testdata.data[i].matches);
  //     }
  //
  //   }
  //   });




  request('http://synd.cricbuzz.com/j2me/1.0/livematches.xml', function(error, response, body) {
    var xml = body;
    to_json(xml, function(error, data) {
      // Module returns a JS object
      // -> { prop1: 'val1', prop2: 'val2', prop3: 'val3' }

      // Format as a JSON string
      // res.send(data.mchdata.match[0]);
      // res.send(data.mchdata.match["0"]);
      res.render("home", {
        btcvalue: btcvalue,
        xrpvalue: xrpvalue,
        ethvalue: ethvalue,
        onedayBtc: onedayBtc,
        onedayXrp: onedayXrp,
        onedayEth: onedayEth,
        btcTimeStamp: btcTimeStamp,
        xrpTimeStamp: xrpTimeStamp,
        ethTimeStamp: ethTimeStamp,
        btcxvalue: btcxvalue,
        cricketScore: data.mchdata.match[0]
      });

      // -> {"prop1":"val1","prop2":"val2","prop3":"val3"}
    });

  });

});
app.get("/gift", function(req, res) {
  res.render("newyear");

});

app.post('/updateprice', getStatus, function(req, res) {
  res.send({
    btcvalue: btcvalue,
    xrpvalue: xrpvalue,
    ethvalue: ethvalue,
    onedayBtc: onedayBtc,
    onedayXrp: onedayXrp,
    onedayEth: onedayEth,
    btcTimeStamp: btcTimeStamp,
    xrpTimeStamp: xrpTimeStamp,
    ethTimeStamp: ethTimeStamp,
    btcxvalue: btcxvalue
  });
});

bot.on('message', (msg) => {
  let name;
  var Hi = "hi";
  if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
    bot.sendMessage(msg.chat.id, "Hello dear user");
  }
  if (msg.text.toString().toLowerCase() === '/xrpinr') {
    telRipple((xrpvalue) => {
      let telXrpInr = Number(xrpvalue.price_inr).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      bot.sendMessage(msg.chat.id, `Ripple(XRP) price is Rs. ${telXrpInr}`);
    });

  }

  if (msg.text.toString().toLowerCase() === '/xrpusd') {
    telRipple((xrpvalue) => {
      let telXrpInr = Number(xrpvalue.price_usd).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      bot.sendMessage(msg.chat.id, `Ripple(XRP) price is $${telXrpInr}`);
    });

  }

});

bot.on('polling_error', (error) => {

  console.log(error.code); // => 'EFATAL'
});

app.get('/medium', (req, res) => {
  res.render('medium');
});

app.get('/mediumdownload', (req, res) => {
  let url = req.query.url;
  url = url.split('-');
  url = url[url.length - 1];
  console.log(url);
  request.get('https://medium.com/p/' + url + '/notes', function(err, ress, body) {
    if (err) {
      console.log('error occured');
    } else {
      var x = JSON.parse(body.substr(16));
      var streamURL = x.payload.post.audioVersionUrl;
      var fileName = x.payload.post.slug.substr(0, 4);
      res.render('download', {
        streamURL: streamURL,
        fileName: fileName
      })

    }

  });
});

app.get('/api', (req, res) => {
  res.render('api');
});
app.get('/part1', (req, res) => {
  res.render('part1');
});

app.get('/part2', (req, res) => {
  res.render('part2');
});

app.get('/part3', (req, res) => {
  res.render('part3');
});

app.get('/part4', (req, res) => {
  res.render('part4');
});

app.get('/part5', (req, res) => {
  res.render('part5');
});

io.on('connection', function(socket) {
  console.log('a user connected');
  setInterval(function() {
    request('http://synd.cricbuzz.com/j2me/1.0/livematches.xml', function(error, response, body) {
      var xml = body;
      to_json(xml, function(error, data) {
        // res.send(data.mchdata.match["0"]);
        // console.log(data.mchdata.match["0"]);
        socket.emit('new_score', data.mchdata.match["0"]);
      });

    });

  }, 5000)
});

http.listen(port, function() {
  console.log('listening on port: ' + port);
});
console.log("Listening on port " + port);
