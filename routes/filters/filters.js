const express = require("express");
const assert = require('assert');
const GridFSStorage = require('multer-gridfs-storage');
const {GridFSBucket, ObjectID} = require('mongodb');
//Call python script
//Using child_process package
const spawn = require("child_process").spawn

//router è il middleware, sistema di "routing"
const router = express.Router();
const fs = require("fs");


runPyScript = function(req,res, paramList){
    var pythonProcess;
    var uploadName;

    const bucket = new GridFSBucket(req.app.locals.db, {
        bucketName: 'images',
    });
    
    //ParamList[1] always contains sourceS
    bucket
        .openDownloadStream(new ObjectID(paramList[1]))
        .pipe(fs.createWriteStream(paramList[1]))
        .on('finish', () => {
            //Run the correct script
            pythonProcess = spawn('python', paramList) 

            pythonProcess.stdout.on('data', (data) => {
                //Return the data as response to the client
                //res.end(data.toString());
                uploadName = data.toString();
                strangeID = fs
                    .createReadStream(uploadName)
                    .pipe(bucket.openUploadStream(uploadName))
                    .on('error', function (error) {
                        assert.ifError(error);
                    })
                    .on('finish', function (id) {
                        retId = id._id;
                        console.log(retId);
                        res.json({status:'SUCCES', id:retId});
                    });                
            });

            pythonProcess.stderr.on('data', (data) => {
                res.json({status:'ERROR', msg:data.toString()});
            });

            pythonProcess.on('close', (code)=>{
                fs.promises.unlink(paramList[1])
                    .catch((err)=>{
                        console.log(err);
                    });

                fs.promises.unlink(uploadName)
                    .catch((err)=>{
                        console.log(err);
                    });
            });

        })
        .on('error', (error) => {
            console.log("ERROR")
            assert.ifError(error);
        })
}

exports.grayscale = function(req, res){
    const source = req.query.source;

    runPyScript(req,res, ["./routes/scripts/blackwhite.py",source])

}

exports.transpose = function(req,res){
    const source = req.query.source;
    const side = req.query.side;

    runPyScript(req,res, ["./routes/scripts/transpose.py",source,side])
}
//Route to apply a filter
router.post('/bw', (req, res) => {
    //filter and source are common for every route
    const source = req.query.source;

    runPyScript(req,res,"blackwhite", [source])
    
    //Call the python script giving all the required params

    //I have to download the image source 
    //From the DB  
        

    /*
    switch(filter){
        case "bw":
            // Params: source
            pythonProcess = spawn('python', ["./routes/scripts/blackwhite.py", source]);    
            break;
        
        case "transpose":
            // Params: source, sides,
            const side = req.query.side;
            //Check of side in done inside the python script
            pythonProcess = spawn('python', ["./routes/scripts/transpose.py", source, side]);    
            break;

        case "binary":
            // Params: source
            pythonProcess = spawn('python', ["./routes/scripts/binary.py", source]);    
            break;

        case "rotate":
            // Params: source, degree
            const angle = req.query.angle;
            if(angle){
                //Check if angle is defined
                pythonProcess = spawn('python', ["./routes/scripts/rotate.py", source, angle]);
                break;
            }
            else{ 
                //Error becase angle param can't be recognized
                res.json({"status":"ERROR", "msg":"Can't recognize the parameter angle"});
                res.end();
                //Return from this endpoint, the server keep listening for other requests
                return 
            }
        
        default:
            res.json({"status":"ERROR", "msg":"Can't recognize the given filter name"});
            res.end();
            //Return from this endpoint, the server keep listening for other requests
            return
    }*/
    
    //Listen for data from the python script
    

    //Load the new image, IF EXISTS
});

exports.getFilters = function(req,res){
    //Return the static file ./files/filters

    //Open and read the static file
    fs.readFile("./files/filters.json", "utf8", (err, data) => {
        //Reply to the client with the opened data
        res.end(data)
    });
}
