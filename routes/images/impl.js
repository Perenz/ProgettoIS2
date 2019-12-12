const upload = require('../../middlewares/storage');

exports.upload = upload.arrayMulter('images', ['image/jpeg', 'image/png']);
