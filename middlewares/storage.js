const multer = require('multer');
const GridFSStorage = require('multer-gridfs-storage');
const {ObjectID} = require('mongodb');

const {db} = require('../persistance');

function storage(bucketName) {
    return new GridFSStorage({
        db: db,
        file: () => ({
            bucketName: bucketName
        }),
    });
}

function has(array, value) {
    return array.indexOf(value) !== -1;
}

function filter(accepted) {
    return function (req, file, cb) {
        cb(null, has(accepted, file.mimetype))
    }
}

exports.singleMulter = function (bucket, accepted) {
    return multer({
        storage: storage(bucket),
        fileFilter: filter(accepted),
        limits: {
            fileSize: 5 * 1024 * 1024 * 1024,
        },
    }).single('file')
};

exports.arrayMulter = function (bucket, accepted) {
    return multer({
        storage: storage(bucket),
        fileFilter: filter(accepted),
        limits: {
            fileSize: 5 * 1024 * 1024 * 1024,
        },
    }).array('files')
};

exports.singleRecap = function (req, res) {
    if (req.file) {
        res
            .status(200)
            .json({
                id: req.file.id
            });
    } else {
        res
            .status(400)
            .json({
                error: 'invalid file'
            });
    }
};

exports.arrayRecap = function (req, res) {

    if (req.files.length > 0) {
        res
            .status(200)
            .json({
                ids: req.files.map((file) => file.id),
                names: req.files.map((file) => file.originalname),
            });
    } else {
        res
            .status(400)
            .send({
                error: 'invalid files'
            });
    }
};

exports.download = function (req, res) {
    req.query.bucket
        .openDownloadStream(new ObjectID(req.query.id))
        .pipe(res)
        .on('error', function () {
            res
                .status(500)
                .send('unable to download file');
        })
};