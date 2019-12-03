const multer = require('multer');
const GridFSStorage = require('multer-gridfs-storage');
const {GridFSBucket, ObjectID} = require('mongodb');

const {db} = require('../../persistance');

const storage = new GridFSStorage({
    db: db,
    file: (req, file) => ({
        bucketName: 'images'
    }),
});

function has(array, value) {
    return array.indexOf(value) !== -1;
}

function filter(req, file, cb) {
    cb(null, has(['image/jpeg', 'image/png'], file.mimetype))
}

exports.store = multer({
    storage: storage,
    fileFilter: filter,
    limits: {
        fileSize: 5 * 1024 * 1024 * 1024,
    }
}).single('file');

exports.upload = function (req, res) {
    if (!req.file) {
        res.status(400).send();
        return;
    }

    console.log(req.file);
    res.status(200).json({
        id: req.file.id
    });
};

exports.download = function (req, res) {
    const bucket = new GridFSBucket(req.app.locals.db, {
        bucketName: 'images',
    });

    bucket
        .openDownloadStream(new ObjectID(req.params.id))
        .pipe(res)
        .on('error', function (error) {
            res.status(400).send();
        })
        .on('end', function () {
            console.log('done!');
        });
};