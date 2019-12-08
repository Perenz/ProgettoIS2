const spawn = require("child_process").spawn;
const fs = require("fs");
const {GridFSBucket, ObjectID} = require('mongodb');

function runPyScript(req, res, source, paramList) {
    const bucket = new GridFSBucket(req.app.locals.db, {
        bucketName: 'videos',
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
                                .json({error: 'unable to load the video'});
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

exports.cut = function (req, res) {
    const source = req.query.source;
    const start_time = req.query.start_time;
    const finish_time = req.query.finish_time;

    runPyScript(req, res, source, ["./scripts/v_cut.py", source, start_time, finish_time])
};

exports.speedup = function (req, res) {
    const source = req.query.source;
    const factor = req.query.factor;
    runPyScript(req, res, source, ["./scripts/v_speedup.py", source, factor])
};

exports.resize = function (req, res) {
    const source = req.query.source;
    const pixel_x = req.query.pixel_x;
    const pixel_y = req.query.pixel_y;


    const pixel_x = req.query.pixel_x;
    runPyScript(req, res, source, ["./scripts/v_resize.py", source, pixel_y])
};
/////
exports.filters = function (req, res) {
    res
        .status(200)
        .json({
            available: [
                {
                    "name": "cut",
                    "schema": "source:imgID",
                    "description": "Cut a video"
                },
                {
                    "name": "speedup",
                    "schema": "source:imgID, side:x|y|xy",
                    "description": "Transpose an image with respect to the specified axis: x, y or xy for both"
                },
                {
                    "name": "resize",
                    "schema": "source:imgID, side:x|y|xy",
                    "description": "Transpose an image with respect to the specified axis: x, y or xy for both"
                }
            ]
        });
};
