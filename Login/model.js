const mongoose = require('mongoose');

const models = mongoose.Schema({
    username:String,
    password:String,
    country:String,
    subject:String

    });
module.exports = mongoose.model('Note',models);