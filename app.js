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
const smule = require('smule-api');


// var port = process.env.PORT;
var port = 5000;

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
var newsData = null;
var questionNumber =null;
var questionResult =null;
var questionValue =null;
var correctAnswer = null;
var incorrectAnswers = null;
var randomizedOptions = null;
var correctAnswerIndex = null;



function getStatus(req, res, next) {
  // request('https://newsapi.org/v2/top-headlines?country=in&apiKey=699bf2a52d6043e486c714a3e47f2064', function(error, response, body) {
  //       newsData = JSON.parse(body);
  //
  //   });

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
  console.log("inside getstatus");
  next();

  // cloudscraper.get(btcxUrl, function(error, response, body) {
  //   if (error) {
  //     console.log('Error occurred');
  //     console.log(error);
  //   } else {
  //
  //     if (response.headers["content-type"] == 'application/json') {
  //       // console.log(body);
  //       btcxvalue = JSON.parse(body);
  //     }
  //     // console.log(btcxvalue);
  //
  //     // next();
  //     // setTimeout(function(){
  //     //   next();
  //     // }, 3000);
  //   }
  // });
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




function getTrivia(req,res,next){
  request('https://opentdb.com/api.php?amount=50', function(error, response, body) {
      if(error){
        console.log("error occurred");
          console.log(error);
          next();
      }else{
        if(response.statusCode){
          questionNumber = Math.floor(Math.random() * 51);
          questionResult = JSON.parse(body);
          questionValue = questionResult.results[questionNumber].question;
          correctAnswer = questionResult.results[questionNumber].correct_answer;
          incorrectAnswers = [];
          incorrectAnswers = questionResult.results[questionNumber].incorrect_answers;
          incorrectAnswers.push(correctAnswer);
          function shuffle(array) {
             var currentIndex = array.length, temporaryValue, randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

              // Pick a remaining element...
              randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex -= 1;

              // And swap it with the current element.
              temporaryValue = array[currentIndex];
              array[currentIndex] = array[randomIndex];
              array[randomIndex] = temporaryValue;
            }

            return array;
          }

           randomizedOptions = shuffle(incorrectAnswers);
           correctAnswerIndex = randomizedOptions.indexOf(correctAnswer);
          next();
        }
        else{
          next();
        }



      }

  });


}

app.get("/", getStatus,getTrivia, function(req, res) {
  console.log("hellllllloooooooo");
  request('http://synd.cricbuzz.com/j2me/1.0/livematches.xml', function(error, response, body) {
    var xml = body;
    to_json(xml, function(error, data) {
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
        cricketScore: data.mchdata.match[0],
        newsData: newsData,
        questionValue: questionValue,
        randomizedOptions: randomizedOptions,
        correctAnswerIndex: correctAnswerIndex
      });

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

app.get('/smule', (req, res) => {
  res.render('smule');
});

app.get('/smuledownload', (req, res) => {
  let url = req.query.url;
  smule.type(url).then(res => {
    console.log(res);
  });
  smule.source(url).then(re => {
    if(re.substr(0,11) != "getaddrinfo" && re.substr(0,6) != "Cannot"){
      res.redirect(re);
    }else{
      console.log("incorrect url");
      res.send("incorrect url")
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

app.get('/hbdshahitha', (req, res) => {
  res.render('hbdsash');
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
