const impl = require('./formats');
const express = require('express');
const router = express.Router();

router.get('/', impl.formats);
router.post('/png', impl.png);
router.post('/jpeg', impl.jpeg);

module.exports = router;