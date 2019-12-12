exports.bucket = function (req, res, next) {
    req.query.bucketName = 'images';
    next();
};

exports.png = function (req, res, next) {
    const source = req.query.source;

    req.query.script = './scripts/images/png.py';
    req.query.required = [source];
    next();
};

exports.jpeg = function (req, res, next) {
    const source = req.query.source;

    req.query.script = './scripts/images/jpeg.py';
    req.query.required = [source];
    next();
};

exports.formats = function (req, res) {
    res
        .status(200)
        .json({
            available: [
                {
                    name: "png",
                    schema: "source:imgID",
                    description: "Convert the format of the image to png"
                },
                {
                    name: "jpeg",
                    schema: "source:imgID",
                    description: "Convert the format of the image to jpeg"
                }
            ]
        });
};