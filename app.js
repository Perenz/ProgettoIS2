const express = require('express');
const logger = require('morgan');
const {db} = require('./persistance');

const image = require('./routes/image/index');
const video = require('./routes/video/index');
const filters = require('./routes/filters');

const app = express();

app.locals.db = db;
app.use(logger('dev'));
app.use(express.json());

app.use(express.urlencoded({
    extended: false
}));

app.use('/image', image);
app.use('/video', video);
app.use("/filters", filters);

module.exports = app;
