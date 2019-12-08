const impl = require('./filters');
const express = require('express');
const router = express.Router();

router.get('/', impl.filters);
router.post('/cut', impl.cut);
router.post('/speedup', impl.speedup);
router.post('/resize', impl.resize);


module.exports = router;