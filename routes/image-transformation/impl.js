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
/*
Image.resize(size, filter)
Returns a resized copy of an image. The size argument gives the requested size in pixels, as a 2-tuple: (width, height).
*/
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
/*
Image.crop(box)
Returns a copy of a rectangular region from the current image. The box is a 4-tuple defining the left, upper, right, and lower pixel coordinate.
*/
exports.crop = function (req, res) {
    const source = req.query.source;
    const box = req.query.box;

    runPyScript(req, res, source, ["./scripts/crop.py", source, box])
};
/*Image.transform(size, PERSPECTIVE, data, filter)
Applies a perspective transform to the image, and places the result in a new image with the given size.

Data is a 8-tuple (a, b, c, d, e, f, g, h) which contains the coefficients for a perspective transform. For each pixel (x, y) in the output image, the new value is taken from a position (a x + b y + c)/(g x + h y + 1), (d x + e y + f)/(g x + h y + 1) in the input image, rounded to nearest pixel.

This function can be used to change the 2D perspective of the original image.
*/
exports.transform = function (req, res) {
    const source = req.query.source;
    const size = req.query.size;
    const data = req.query.data;

    runPyScript(req, res, source, ["./scripts/transform.py", source, size, data])
};
exports.transformation = function (req, res) {
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
