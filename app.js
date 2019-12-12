const express = require('express');
const logger = require('morgan');
const {db} = require('./persistance');

const v1 = require('./routes/1');

const app = express();

app.locals.db = db;
app.use(logger('dev'));
app.use(express.json());

app.use(express.urlencoded({
    extended: false
}));

app.use('/v1', v1);

module.exports = app;
