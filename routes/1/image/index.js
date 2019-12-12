const impl = require('./impl');
const storage = require('../../../middlewares/storage');
const commons = require("../../../middlewares/commons");
const express = require('express');
const router = express.Router();

router.post('/', impl.upload, storage.singleRecap);
router.get('/', impl.bucket, commons.exists, storage.download);

module.exports = router;