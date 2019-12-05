const impl = require('./impl');
const express = require('express');
const router = express.Router();

router.get('/', impl.transformation);
router.post('/rotate', impl.rotate);
router.post('/resize', impl.resize);
router.post('/transpose', impl.transpose); 
router.post('/transform', impl.transform);
router.post('/crop', impl.crop);

module.exports = router;

