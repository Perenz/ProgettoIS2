const upload = require('../../middlewares/storage');

exports.upload = upload.arrayMulter('videos', ['video/mp4']);
