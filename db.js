const express = require('express');
const mongoose = require('mongoose');
const dbConfig = require('./config/db.config');

var app = express();

mongoose.connect(dbConfig.url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('connected to database');
}).catch(err =>{
    console.log('Error');
});

var port = 8080;
app.listen(port,function(req,res){
    console.log("Server is renning" +port);
});
