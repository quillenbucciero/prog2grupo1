const newLocal = require('http-errors');
var createError = newLocal;
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

/*Requerimientos*/
var indexRouter = require('./routes/index');
const productsRouter = require('./routes/product');
const profileRouter = require('./routes/profile');
const searchResultsRouter = require('./routes/search-results')

/* Requerimiento de db */ 
const db = require('./database/models');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*Requiero session*/
const session = require('express-session');

/*Ejecuto session*/
app.use(session( { secret: "prog2grupo1",
				resave: false,
				saveUninitialized: true 
}));

/*Middleware de session*/
app.use(function (req,res,next) {
  if (req.session.user != undefined) {
    res.locals.user = req.session.user;
    return next()
  }
  return next();
});

/* Middleware se cookies */ 
app.use(function(req, res, next) {

  if (req.cookies.id != undefined && req.session.user == undefined) {
    
    let idUserCookie = req.cookies.id;
   
    db.Usuarios.findByPK(idUserCookie)
    .then((user) => {
      req.session.user = user.dataValues; // aca guardo el id
      res.locals.user = user.dataValues; //quiero q guardes en locals y en session lo q me venga del navegador
      return next();

    }).catch((err) => {

      console.log(err);

    });
  }  else {
    return next();
    }
  
});


/*Inicio de rutas, los prefijos*/
app.use('/', indexRouter);
app.use('/product' , productsRouter); 
app.use('/profile', profileRouter);
app.use('/search-results', searchResultsRouter);

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

module.exports = app;
