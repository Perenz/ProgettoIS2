const impl = require('./filters');
const express = require('express');
const router = express.Router();

router.get('/', impl.getFilters);
router.post('/bw', impl.grayscale);
router.post('/transpose', impl.transpose)

module.exports = router;