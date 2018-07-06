var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var dashboard = require('./routes/dashboard');
var contracts = require('./routes/contracts');
var equipment_list = require('./routes/equipment_list');
var data_maintenance = require('./routes/data_maintenance');
var login = require('./routes/login');
var logs = require('./routes/logs');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(favicon(path.join(__dirname, 'public', 'icon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
	secret: "asdkwe2132112dqpdp", resave: false, saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/contracts', express.static(path.join(__dirname, 'public')));

app.use('/', dashboard);
app.use('/contracts', contracts);
app.use('/', equipment_list);
app.use('/data_maintenance', data_maintenance);
app.use('/', login);
app.use('/', logs);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

app.listen(8085, function () {
	console.log('CMS-SPARES @ 8085');
});

module.exports = app;
