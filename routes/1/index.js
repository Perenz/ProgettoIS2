const image = require('./image');
const images = require('./images');
const image_filters = require('./image-filters');
const image_formats = require('./image-formats');
const image_transformations = require('./image-transformations');

const video = require('./video');
const videos = require('./videos');
const video_transformations = require('./video-transformations');

const express = require('express');
const router = express.Router();

router.use('/image', image);
router.use('/images', images);
router.use('/image-filters', image_filters);
router.use('/image-formats', image_formats);
router.use('/image-transformations', image_transformations);

router.use('/video', video);
router.use('/videos', videos);
router.use('/video-transformations', video_transformations);

module.exports = router;