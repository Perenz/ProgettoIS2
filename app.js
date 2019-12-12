const express = require('express');
const logger = require('morgan');
const {db} = require('./persistance');

const image = require('./routes/image/index');
const images = require('./routes/images/index');
const image_filters = require('./routes/image-filters/index');
const image_formats = require('./routes/image-formats/index');
const image_transformations = require('./routes/image-transformations/index');

const video = require('./routes/video/index');
const videos = require('./routes/videos/index');
const video_transformations = require('./routes/video-transformations/index');

const app = express();

app.locals.db = db;
app.use(logger('dev'));
app.use(express.json());

app.use(express.urlencoded({
    extended: false
}));

app.use('/image', image);
app.use('/images', images);
app.use('/image-filters', image_filters);
app.use('/image-formats', image_formats);
app.use('/image-transformations', image_transformations);

app.use('/video', video);
app.use('/videos', videos);
app.use('/video-transformations', video_transformations);


module.exports = app;
