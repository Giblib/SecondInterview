var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var config = require('./config/config');

var app = express();
app.set('x-powered-by', false);

mongoose.connect(config.mongodb.uri, config.mongodb.opts);

var auth = require('./middleware/auth');
var routes = require('./routes/');

auth.init(config.secret, config.options);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'dist', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api/v1/authenticate', auth.authenticate());
app.use('/api/v1', auth.authorize(), routes.apiv1);

app.use('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/', 'index.html'));
});

app.use('*', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (config.env === 'development') {
    app.use(function (err, req, res) {
        res.status(err.status || 500);
        res.send({
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res) {
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: {}
    });
});

module.exports = app;
