const multer = require('multer');
const express = require("express");
//router è il middleware, sistema di "routing"
const router = express.Router();
const debug = require('debug')('myapp:server');



const formati_file = ["image/jpeg", "image/png", "image/jpeg" ];


var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
      },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});
//filtro formato file accettati
const fileFilter = (req, file, cb) => {
    var found = false;
    //Verifico se il formato del file è accettato dal sistema
    for(var i = 0; i<formati_file.length && found; i++){
        if (file.mimetype === formati_file[i]) {
            cb(null, true);
            found = true;
        }
    }
    //Il formato del file non è supportato 
    if(!found){
        console.log("Il formato del file non è supportato");
        cb(null, false);  
    }
};
//will be using this for uplading
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 * 1024
    },
    //fileFilter: fileFilter
});


router.post('/', upload.single('file'), function(req ,res, next) {
    debug(req.file);
    console.log('storage location is ', req.hostname +'/' + req.file.path);
    return res.send(req.file);
    
})


module.exports = router;