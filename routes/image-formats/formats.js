const fs = require("fs");
const spawn = require("child_process").spawn;
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
                .on('close', (code) => {
                    if(code==0){
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
                        }else{
                            res.status(500)
                                .json({error: 'Script ended with code '+ code});
                        }
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

exports.png = function (req, res){
    const source = req.query.source;

    runPyScript(req, res, source, ["./scripts/png.py", source])
};

exports.jpeg = function (req, res){
    const source = req.query.source;

    runPyScript(req, res, source, ["./scripts/jpeg.py", source])
};

exports.error404 = function(req,res){
    res.status(404)
        .json({error: 'Format not found'});
}

exports.formats = function (req, res){
    res
        .status(200)
        .json({
            available: [
                {
                    "name": "png",
                    "schema": "source:imgID",
                    "description": "Convert the format of the image to png"
                },
                {
                    "name": "jpeg",
                    "schema": "source:imgID",
                    "description": "Convert the format of the image to jpeg"
                }
            ]
        });
};