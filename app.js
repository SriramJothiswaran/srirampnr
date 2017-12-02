const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');
const request = require('request');
var trainApiKey = "i0tm7cgqa6";


var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//
//app.get('/',function(req,res){
//   res.render('search',{});
//});



app.post('/trainstatus',function(req,res){
   let trainno = req.body.trainno;
   let today = new Date();

   var dd = today.getDate();
   var mm = today.getMonth()+1; //January is 0!

   var yyyy = today.getFullYear();
   if(dd<10){
      dd='0'+dd;
   }
   if(mm<10){
      mm='0'+mm;
   }
   today = dd+'-'+mm+'-'+yyyy;
   let apikey = trainApiKey;
   let url = `https://api.railwayapi.com/v2/live/train/${trainno}/date/${today}/apikey/${apikey}/`;
   console.log(url);

   request(url, function (err, response, body) {
      console.log(response);
   });
});



app.listen(process.env.PORT || 5000);
