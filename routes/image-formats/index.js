const impl = require('./formats');
const commons = require('../../middlewares/commons');
const express = require('express');
const router = express.Router();

router.get('/', impl.formats);
router.post('/png', impl.png, commons.params, impl.bucket, commons.exists, commons.execute);
router.post('/jpeg', impl.jpeg, commons.params, impl.bucket, commons.exists, commons.execute);

module.exports = router;