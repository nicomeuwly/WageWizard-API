import express from 'express';
import createError from 'http-errors';
import logger from 'morgan';
import usersRouter from './src/routes/users.js';
import salariesRouter from './src/routes/salaries.js';
import mongoose from 'mongoose';
import 'dotenv/config';

const app = express();

mongoose.connect(process.env.DATABASE_URL, { dbName: process.env.DB_NAME }, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', usersRouter);
app.use('/salaries', salariesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Send the error status
  res.status(err.status || 500);
  res.send(err.message);
});

export default app;