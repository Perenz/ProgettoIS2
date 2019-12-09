const impl = require('./impl');
const commons = require('../../middlewares/commons');
const express = require('express');
const router = express.Router();

router.get('/', impl.transformations);
router.post('/rotate', impl.rotate, commons.params, impl.bucket, commons.exists, commons.execute);
router.post('/resize', impl.resize, commons.params, impl.bucket, commons.exists, commons.execute);
router.post('/transpose', impl.transpose, commons.params, impl.bucket, commons.exists, commons.execute);
router.post('/transform', impl.transform, commons.params, impl.bucket, commons.exists, commons.execute);
router.post('/crop', impl.crop, commons.params, impl.bucket, commons.exists, commons.execute);

module.exports = router;
