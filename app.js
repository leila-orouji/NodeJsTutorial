const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const fileStore = require('session-file-store')(session);
const passport = require('passport');
const authenticate = require('./authenticate');
const indexRouter = require('./routes/index');
var homeRouter = require('./routes/home');
var usersRouter = require('./routes/users');


const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/confusion';
const connect = mongoose.connect(url);

connect.then((db)=>{
  console.log('Connected currectly to the server');
}, (err)=>{ console.log(err)})


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('Lksdas893032urnjndlf=-./kd'));


//Authentication / Cookie / Session

//setting Session midelware
app.use(session({
  name: 'Remember Admin',
  secret: 'Lksdas893032urnjndlf=-./kd',
  saveUninitialized: false,
  resave: false,
  store: new fileStore(),
  // cookie: {expires:  new Date(Date.now() + 900000)}
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', homeRouter);
app.use('/users', usersRouter);

function auth(req,res, next){

  if (!req.user){
      var err = new Error('You are not authenticated!');
      err.status=401;
      return next(err);
    }
  else{
      next();
    }  
}

app.use(auth);

app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);


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
  res.render('error', {title: 'errrror', err: err});
});

module.exports = app;
