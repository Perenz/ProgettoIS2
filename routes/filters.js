const express = require("express");
//router è il middleware, sistema di "routing"
const router = express.Router();
const fs = require("fs");

//Route to apply a filter
router.get('/:filter', (req, res) => {
    //filter and source are common for every route
    const filter = req.params.filter;
    const source = req.query.source;
    //Call python script
    //Using child_process package
    const spawn = require("child_process").spawn
    var pythonProcess;
    //Call the python script giving all the required params


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
    }
    
    //Listen for data from the python script
    pythonProcess.stdout.on('data', (data) => {
        //Return the data as response to the client
        res.end(data.toString());
    });
});

//Route to get list of every filter
router.get('', (req,res) => {
    //Return the static file ./files/filters

    //Open and read the static file
    fs.readFile("./files/filters.json", "utf8", (err, data) => {
        //Reply to the client with the opened data
        res.end(data)
    });
});

module.exports = router;