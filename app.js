const express = require('express')
const app = express()
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const createError = require('http-errors');
const path = require('path');

const env = process.env.NODE_ENV || 'development';
const config = require('./config/config.json')[env];

const indexRouter = require('./routes/index');
const photoRouter = require('./routes/photos');
const captionRouter = require('./routes/captions');
const userRouter = require('./routes/users');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/photos', photoRouter);
app.use('/captions', captionRouter);
app.use('/users', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

if (!config.privateKey) {
    console.error("FATAL ERROR: privateKey is not defined.");
    process.exit(1);
}

module.exports = app;