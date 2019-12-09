const spawn = require("child_process").spawn;
const fs = require("fs");
const {GridFSBucket, ObjectID} = require('mongodb');

function python(params) {
    return new Promise(function (resolve, reject) {
        spawn('python', params)
            .on('close', function (code) {
                if (0 === code)
                    resolve('so far, so good');
                else
                    reject('python has thrown an exception');
            })
            .on('error', function () {
                reject('unable to start python script');
            })
    })
}

function upload(bucket, source) {
    return new Promise(function (resolve, reject) {
        fs
            .createReadStream(source)
            .pipe(bucket.openUploadStream(source))
            .on('finish', function (doc) {
                resolve(doc);
            })
            .on('error', function () {
                reject(`unable to upload file with id ${source}`);
            });
    })
}

function download(bucket, source) {
    return new Promise(function (resolve, reject) {
        bucket
            .openDownloadStream(new ObjectID(source))
            .pipe(fs.createWriteStream(source))
            .on('finish', function () {
                resolve('so far so good');
            })
            .on('error', function () {
                reject(`unable to download file with id ${source}`);
            });
    })
}

function find(bucket, source) {
    return !ObjectID.isValid(source)
        ? new Promise((resolve) => {
            resolve(false);
        })
        : bucket
            .find(new ObjectID(source), {limit: 1})
            .hasNext();
}

function undef(x) {
    return x === undefined || x === null;
}

exports.params = function (req, res, next) {
    const script = req.query.script;
    const required = req.query.required;
    const optional = req.query.optional;

    if ([script].concat(required).some(undef)) {
        res
            .status(400)
            .json({error: `missing arguments`});
    } else {
        req.query.params = [script].concat(required).concat(optional);
        next();
    }
};

exports.exists = function (req, res, next) {
    const bucketName = req.query.bucketName;
    const source = req.query.source || req.params.id;

    const bucket = new GridFSBucket(req.app.locals.db, {
        bucketName: bucketName,
    });

    find(bucket, source)
        .then((exists) => {
            if (exists) {
                req.query.bucket = bucket;
                next();
            } else {
                res
                    .status(404)
                    .json({error: `no file has id equals to ${source}`});
            }
        })
        .catch(() => {
            res
                .status(500)
                .json({error: `something went wrong while trying to retrieve the resource`})
        });
};

exports.execute = function (req, res) {
    const bucket = req.query.bucket;
    const source = req.query.source;
    const params = req.query.params;

    download(bucket, source)
        .then(() => python(params))
        .then(() => upload(bucket, source))
        .then((doc) => {
            res
                .status(200)
                .json({id: doc._id});
        })
        .catch((error) => {
            res
                .status(500)
                .json(error);
        })
        .finally(() =>
            fs.promises.unlink(source)
        )
        .catch((error) => {
            console.log(error);
        });
};
