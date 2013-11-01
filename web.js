var express = require('express');
var http = require('http');
var path = require('path');
var index = require('./routes/index.js');
var login = require('./routes/login.js');
var signup = require('./routes/signup.js');

var app = express();

var fs = require('fs');
var logFile = fs.createWriteStream(__dirname + "/public/logs/mover.log", {flags:'a'});

app.use(express.logger({stream: logFile}));

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.set('models',require('./models'));

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/*app.get('/', function(req, res) {
   res.redirect('2013/results');
});*/

//app.param('wknum');

var load_model = function(req,res,next) {
   res.locals.models = app.get('models');
   next();
};

app.get('/',index.index);
app.get('/login',login.get);
app.post('/login',load_model,login.post);
app.get('/signup',signup.get);
app.post('/signup',load_model,signup.post);
//app.get('/:year/results', load_model, overall_results.get);


var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});
