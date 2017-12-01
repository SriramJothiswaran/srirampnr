const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');


var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/',function(req,res){
   res.render('home',{});
});



app.listen(process.env.PORT || 5000);
