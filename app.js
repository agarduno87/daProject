var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var multer = require('multer');

var mainRouter = require('./routes/main');
var productsRouter = require('./routes/products')
var methodOverride = require('method-override'); // Pasar poder usar los métodos PUT y DELETE

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); // Define la ubicación de la carpeta de las Vistas
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

var mainRouter = require('./routes/main');
var productsRouter = require('./routes/products')
var usersRouter = require('./routes/users')

app.use('/', mainRouter);
app.use('/products', productsRouter);
app.use('/users', usersRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => next(createError(404)));

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Servidor funcionando en el puerto 3000')
})

// app.listen(3000, () => {
//   console.log('Servidor funcionando en el puerto 3000')
// })

module.exports = app;
