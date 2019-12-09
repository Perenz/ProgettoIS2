const impl = require('./impl');
const storage = require('../../middlewares/storage');

const express = require('express');
const router = express.Router();

router.post('/', impl.upload, storage.arrayRecap);

module.exports = router;