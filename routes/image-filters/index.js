const impl = require('./impl');
const commons = require('../../middlewares/commons');
const express = require('express');
const router = express.Router();

router.get('/', impl.filters);
router.post('/binary', impl.binary, commons.params, impl.bucket, commons.exists, commons.execute);
router.post('/greyscale', impl.greyscale, commons.params, impl.bucket, commons.exists, commons.execute);
router.post('/invert', impl.invert, commons.params, impl.bucket, commons.exists, commons.execute);

module.exports = router;