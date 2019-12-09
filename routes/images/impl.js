const upload = require('../../middlewares/storage');

exports.bucket = function (req, res, next) {
    req.query.bucketName = 'images';
    next();
};

exports.upload = upload.arrayMulter('images', ['image/jpeg', 'image/png']);
