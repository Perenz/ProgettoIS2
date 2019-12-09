exports.bucket = function (req, res, next) {
    req.query.bucketName = 'images';
    next();
};

exports.rotate = function (req, res, next) {
    const source = req.query.source;
    const angle = req.query.angle;

    req.query.script = './scripts/rotate.py';
    req.query.required = [source, angle];
    next();
};

/*
Image.resize(size, filter)
Returns a resized copy of an image. The size argument gives the requested size in pixels, as a 2-tuple: (width, height).
*/
exports.resize = function (req, res, next) {
    const source = req.query.source;
    const width = req.query.width;
    const height = req.query.height;

    req.query.script = './scripts/rotate.py';
    req.query.required = [source, width, height];
    next();
};

exports.transpose = function (req, res, next) {
    const source = req.query.source;
    const side = req.query.side;

    req.query.script = './scripts/rotate.py';
    req.query.required = [source, side];
    next();
};

/*
Image.crop(box)
Returns a copy of a rectangular region from the current image. The box is a 4-tuple defining the left, upper, right, and lower pixel coordinate.
*/
exports.crop = function (req, res, next) {
    const source = req.query.source;
    const left = req.query.left;
    const upper = req.query.upper;
    const right = req.query.right;
    const lower = req.query.lower;

    req.query.script = './scripts/rotate.py';
    req.query.required = [source, left, upper, right, lower];
    next();
};

/*Image.transform(size, PERSPECTIVE, data, filter)
Applies a perspective transform to the image, and places the result in a new image with the given size.

Data is a 8-tuple (a, b, c, d, e, f, g, h) which contains the coefficients for a perspective transform. For each pixel (x, y) in the output image, the new value is taken from a position (a x + b y + c)/(g x + h y + 1), (d x + e y + f)/(g x + h y + 1) in the input image, rounded to nearest pixel.

This function can be used to change the 2D perspective of the original image.
*/
exports.transform = function (req, res, next) {
    const source = req.query.source;
    const width = req.query.width;
    const height = req.query.height;
    const a = req.query.a;
    const b = req.query.b;
    const c = req.query.c;
    const d = req.query.d;
    const e = req.query.e;
    const f = req.query.f;
    const g = req.query.g;
    const h = req.query.h;

    req.query.script = './scripts/transform.py';
    req.query.required = [source, width, height, a, b, c, d, e, f, g, h];
    next();
};

exports.transformations = function (req, res) {
    res
        .status(200)
        .json({
            available: [
                {
                    name: "rotate",
                    schema: "source:imgID, (int)angle",
                    description: "Rotate an image by n degrees"
                },
                {
                    name: "resize",
                    schema: "source:imgID, (int)width, (int)height",
                    description: "Resize an image given width and height"
                },
                {
                    name: "transform",
                    schema: "source:imgID, (int)width, (int)height, (int)a, (int)b, (int)c, (int)d, (int)e, (int)f, (int)g, (int)h",
                    description: "Applies a perspective transform to the image, and places the result in a new image with the given size. (a, b, c, d, e, f, g, h) contains the coefficients for a perspective transform"
                },
                {
                    name: "crop",
                    schema: "source:imgID, (int)left, (int)upper, (int)right, (int)lower",
                    description: "Crop an image selcting his left, upper, right, lower pixel"
                },
                {
                    name: "transpose",
                    schema: "source:imgID, side:x|y|xy",
                    description: "Transpose an image with respect to the specified axis: x, y or xy for both"
                }
            ]
        });
};
