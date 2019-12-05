const express = require('express');
const logger = require('morgan');
const {db} = require('./persistance');

const image = require('./routes/image/index');
const video = require('./routes/video/index');
const filters = require('./routes/image-filters');
const transformations = require('./routes/image-transformations');

const app = express();

app.locals.db = db;
app.use(logger('dev'));
app.use(express.json());

app.use(express.urlencoded({
    extended: false
}));

app.use('/image', image);
app.use('/video', video);
app.use("/image-filters", filters);
app.use("/image-transformations", transformations);

module.exports = app;
