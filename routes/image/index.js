const impl = require('./impl');
const express = require('express');
const router = express.Router();

router.post('/', impl.store, impl.upload);
router.get('/:id', impl.download);

module.exports = router;