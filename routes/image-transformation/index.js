const impl = require('./impl');
const express = require('express');
const router = express.Router();

router.get('/', impl.transformations);
router.post('/rotate', impl.rotate);
router.post('/resize', impl.resize);
router.post('/transpose', impl.transpose);
router.post('/crop', impl.crop);
router.post('/transform', impl.transform);

module.exports = router;

