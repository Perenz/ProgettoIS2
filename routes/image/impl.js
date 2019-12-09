const storage = require('../../middlewares/storage');

exports.bucket = function (req, res, next) {
    req.query.bucketName = 'images';
    next();
};

exports.upload = storage.singleMulter('images', ['image/jpeg', 'image/png']);
