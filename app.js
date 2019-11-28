const express = require('express');
const app = express();

///////
const logger = require('morgan');
const serveIndex = require('serve-index')
const path = require('path');



app.use(logger('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(express.static('public'));
app.use('/ftp', express.static('public'), serveIndex('public', {'icons': true}));

app.get('/', function(req,res) {
    return res.send("hello from my app express server!")
})

const images = require("./routes/images");
//"route" che gestiscono le richieste
app.use("/images", images);


module.exports = app;