const upload = require('../../middlewares/storage');

exports.bucket = function (req, res, next) {
    req.query.bucketName = 'videos';
    next();
};

exports.upload = upload.arrayMulter('videos', ['video/mp4']);
