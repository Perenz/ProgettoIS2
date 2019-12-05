const spawn = require("child_process").spawn;
const fs = require("fs");
const {GridFSBucket, ObjectID} = require('mongodb');

function runPyScript(req, res, source, paramList) {
    const bucket = new GridFSBucket(req.app.locals.db, {
        bucketName: 'images',
    });

    bucket
        .openDownloadStream(new ObjectID(source))
        .pipe(fs.createWriteStream(source))
        .on('finish', () => {
            spawn('python', paramList)
                .on('close', () => {
                    fs
                        .createReadStream(source)
                        .pipe(bucket.openUploadStream(source))
                        .on('error', (error) => {
                            res
                                .status(500)
                                .json({error: 'unable to load image'});
                        })
                        .on('finish', (doc) => {
                            res
                                .status(200)
                                .json({id: doc._id});
                        })
                        .on('finish', () => {
                            fs
                                .promises
                                .unlink(source)
                                .catch((error) => {
                                    console.log(error);
                                })
                        });
                })
                .on('error', (error) => {
                    res
                        .status(500)
                        .json({error: error});
                })
        })
        .on('error', (error) => {
            // TODO error's cause could be 404
            res
                .status(500)
                .json({error: 'server error'});
        })
}

exports.rotate = function (req, res) {
    const source = req.query.source;
    const angle = req.query.angle;

    runPyScript(req, res, source, ["./scripts/rotate.py", source, angle])
};
exports.resize = function (req, res) {
    const source = req.query.source;
    const size = req.query.size;

    runPyScript(req, res, source, ["./scripts/resize.py", source, size])
};
exports.transpose = function (req, res) {
    const source = req.query.source;
    const side = req.query.side;

    runPyScript(req, res, source, ["./scripts/transpose.py", source, side])
};
exports.crop = function (req, res) {
    const source = req.query.source;
    const box = req.query.box;

    runPyScript(req, res, source, ["./scripts/crop.py", source, box])
};
exports.transform = function (req, res) {
    const source = req.query.source;
    const size = req.query.size;
    const data = req.query.data;

    runPyScript(req, res, source, ["./scripts/transform.py", source, size, data])
};
exports.transformations = function (req, res) {
    res
        .status(200)
        .json({
            available: [
                {
                    "name": "greyscale",
                    "schema": "source:imgID",
                    "description": "Convert an image into greyscale in 8 bits"
                },
                {
                    "name": "transpose",
                    "schema": "source:imgID, side:x|y|xy",
                    "description": "Transpose an image with respect to the specified axis: x, y or xy for both"
                }
            ]
        });
};
