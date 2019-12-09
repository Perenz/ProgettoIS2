const impl = require('./video-transformation');
const express = require('express');
const router = express.Router();

router.get('/', impl.video_transformation);
router.post('/cut', impl.cut);
router.post('/speedup', impl.speedup);
router.post('/resize', impl.resize);


module.exports = router;