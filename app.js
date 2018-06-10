var express = require('express');
var path    = require("path");
var app = express();
var routes = require('./routes');
var router = express.Router();

app.use(express.static(__dirname + '/'))

// Setup View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html'); //specifies the engine we want to use
app.use('/',routes)

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index2.html'));
  //__dirname : It will resolve to your project folder.
});

/*
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});*/

app.get('/searchPatient',function(req,res){
  res.sendFile(path.join(__dirname+'/views/home/searchPatient.html'));
});

app.get('/sitemap',function(req,res){
  res.sendFile(path.join(__dirname+'/sitemap.html'));
});

//app.get('/', (req, res) => res.sendFile(path.join(__dirname+'/Hpcare/Home.html')))

app.listen(8080, (err) => {
  err
  ? console.log('Cannt connect to port 8080')
   : console.log('connected! server listening on port 3000!')
});
