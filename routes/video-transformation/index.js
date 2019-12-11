const impl = require('./impl');
const commons = require('../../middlewares/commons');
const storage = require('../../middlewares/storage');
const express = require('express');
const router = express.Router();

router.get('/', impl.video_transformation, commons.params, impl.bucket, commons.exists, commons.execute);
router.post('/cut', impl.cut, commons.params, impl.bucket, commons.exists, commons.execute);
router.post('/speedup', impl.speedup, commons.params, impl.bucket, commons.exists, commons.execute);
router.post('/resize', impl.resize , commons.params, impl.bucket, commons.exists, commons.execute);


module.exports = router;
