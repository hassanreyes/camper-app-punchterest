//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
//
var http            = require('http');
var path            = require('path');
var mongoose        = require('mongoose');
var bodyParser      = require('body-parser');
var cookieParser    = require('cookie-parser');
var express         = require('express');
var express_session = require('express-session');
var flash           = require('connect-flash');
var passport        = require('passport');

var routes          = require("./server/routes/index");
var auth           = require("./server/routes/auth");

var app             = express(),
    router          = express.Router();

//Load process.env variables
require('dotenv').config();
    
//Connect to Nightlife Planner DB
var dbUrl = process.env.MONGODB_URI || "mongodb://localhost:27017/punchterest";
mongoose.connect(dbUrl);

// view engine setup
app.use(express.static(path.resolve(__dirname, 'client')));
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'hbs');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express_session({ secret: 'fcc-punchterest-app-secret', resave: true, saveUninitialized: true }));
app.use(flash());

// Passport Initialization
app.use(passport.initialize());
app.use(passport.session());

//X-Origin Middleware 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
  res.setHeader('Access-Control-Allow-Methods', 'POSTM GETM PATCH, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

//passport setup
const address = process.env.IP || "0.0.0.0";
const port = process.env.PORT || 3000;
var passportInstance = require("./server/passport");
passportInstance.config(passport, address, port);

//Application routes
app.use('/auth', auth(app, router, passportInstance));
app.use('/', routes(app, router, passportInstance));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

//Startup server
var server = http.createServer(app);

server.listen(port, address, function(){
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});
