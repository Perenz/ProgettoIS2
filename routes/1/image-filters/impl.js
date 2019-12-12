exports.bucket = function (req, res, next) {
    req.query.bucketName = 'images';
    next();
};

exports.binary = function (req, res, next) {
    const source = req.query.source;
    const threshold = req.query.threshold;

    req.query.script = './scripts/images/binary.py';
    req.query.required = [source, threshold];
    next();
};

exports.greyscale = function (req, res, next) {
    const source = req.query.source;

    req.query.script = './scripts/images/greyscale.py';
    req.query.required = [source];
    next();
};

exports.invert = function (req, res, next) {
    const source = req.query.source;

    req.query.script = './scripts/images/invert.py';
    req.query.required = [source];
    next();
};

exports.filters = function (req, res) {
    res
        .status(200)
        .json({
            available: [
                {
                    name: "binary",
                    schema: "source:imgID (int)threshold",
                    description: "Convert an image into binary with specified threshold"
                },
                {
                    name: "greyscale",
                    schema: "source:imgID",
                    description: "Convert an image into greyscale in 8 bits"
                },
                {
                    name: "invert",
                    schema: "source:imgID",
                    description: "Invert the colors of an image"
                }
            ]
        });
};
