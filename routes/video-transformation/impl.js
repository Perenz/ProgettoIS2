exports.bucket = function (req, res, next) {
    req.query.bucketName = 'images';
    next();
};

exports.cut = function (req, res,next) {
    const source = req.query.source;
    const start_time = req.query.start_time;
    const finish_time = req.query.finish_time;

    req.query.script = "./scripts/v_cut.py";
    req.query.required = [source, start_time, finish_time];
    next();
};

exports.speedup = function (req, res,next) {
    const source = req.query.source;
    const factor = req.query.factor;
   
    req.query.script =  "./scripts/v_speedup.py";
    req.query.required = [source, factor];
    next();
};

exports.resize = function (req, res,next) {
    const source = req.query.source;
    const pixel_x = req.query.pixel_x;
    const pixel_y = req.query.pixel_y;

    req.query.script =  "./scripts/v_resize.py";
    req.query.required = [source, pixel_x, pixel_y];
    next();
};
/////
exports.video_transformation = function (req, res) {
    res
        .status(200)
        .json({
            available: [
                {
                    name: "cut",
                    schema: "source:videoID, start_time:double, end_time:double",
                    description: "Cut a video from start_time to end_time"
                },
                {
                    name: "speedup",
                    schema: "source:videoID, factor:double",
                    description: "Speed up a video at factor time"
                },
                {
                    name: "resize",
                    schema: "source:videoID, pixel_x:int, pixel_y:int",
                    description: "Resize a video with respect to parameters pixel_x (width) and pixel_y (height)"
                }
            ]
        });
};
