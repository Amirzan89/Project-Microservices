const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const mediaRouter = require('./routes/media');
const orderRouter = require('./routes/orders');
const paymentRouter = require('./routes/payments');
const courseRouter = require('./routes/courses');
const refreshTokenRouter = require('./routes/refreshToken');

const verify = require('./middleware/verifyToken');

app.use(logger('dev'));
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({ extended: false, limit:'50mb'}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/media',mediaRouter);
app.use('/order',orderRouter);
app.use('/courses',verify,courseRouter);
app.use('/payment',paymentRouter);
app.use('/refresh-tokens',refreshTokenRouter);
module.exports = app;
