const impl = require('./filters');
const express = require('express');
const router = express.Router();

router.get('/', impl.filters);
router.post('/binary', impl.binary);
router.post('/greyscale', impl.greyscale);
router.post('/invert', impl.invert);
router.all('/*', impl.error404)

module.exports = router;