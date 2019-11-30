const express = require("express");
//router è il middleware, sistema di "routing"
const router = express.Router();

router.get('/:filter', (req, res) => {
    var filter = req.params.filter;
    console.log("PROVAPROVFA")
    //Call python script
    //Using child_process package
    const spawn = require("child_process").spawn
    const pythonProcess = spawn('python', ["./routes/blackwhite.py"]);

    //Listen for data from the python script
    pythonProcess.stdout.on('data', (data) => {
        res.end(data.toString())
    })
});

module.exports = router;