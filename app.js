var express = require("express");
var app = express();
const bodyParser = require('body-parser');
const request = require("request");
var moment = require('moment');
moment().format();


var port = process.env.PORT;
// var port = 5000;

var io = require('socket.io').listen(app.listen(port));


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
var onedayBtc = null;
var onedayXrp = null;
var onedayEth = null;
var btcTimeStamp = null;
var ethTimeStamp = null;
var xrpTimeStamp = null;




function getStatus(req, res, next){

   request.get(btcUrl,function(err,res,body){
      if(err){

      }else{
         btcvalue = JSON.parse(body)[0];
         btcTimeStamp = moment.unix(btcvalue.last_updated).utcOffset("+05:30").format("Do MMMM YYYY, HH:mm");
         onedayBtc = btcvalue["24h_volume_inr"];


      }

   });
   request.get(xrpUrl,function(err,res,body){
      if(err){

      }else{
         xrpvalue = JSON.parse(body)[0];
         xrpTimeStamp = moment.unix(xrpvalue.last_updated).utcOffset("+05:30").format("Do MMMM YYYY, HH:mm");
         onedayXrp = xrpvalue["24h_volume_inr"];

      }

   });
   request.get(ethUrl,function(err,res,body){
      if(err){

      }else{
         ethvalue = JSON.parse(body)[0];
         ethTimeStamp = moment.unix(ethvalue.last_updated).utcOffset("+05:30").format("Do MMMM YYYY, HH:mm");
         onedayEth = ethvalue["24h_volume_inr"];

         setTimeout(function(){
           next();
         }, 3000);





      }



   });

   // request.get(btcxUrl,function(err,res,body){
   //    if(err){
   //
   //    }else{
   //       btcxvalue = JSON.parse(body);
   //       console.log(btcvalue);
   //    }
   //
   //
   //
   // });
}

app.get("/", getStatus,function(req, res){
   console.log(btcvalue);
   res.render("home",{btcvalue:btcvalue,xrpvalue:xrpvalue,ethvalue:ethvalue,onedayBtc:onedayBtc,onedayXrp:onedayXrp,onedayEth:onedayEth,btcTimeStamp:btcTimeStamp,xrpTimeStamp:xrpTimeStamp,ethTimeStamp:ethTimeStamp});

});


io.sockets.on('connection', function (socket) {
   console.log('hello');

});
console.log("Listening on port " + port);
