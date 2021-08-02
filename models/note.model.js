const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    title: String,
    content: String,
    name: String,
    number:String,
    password:String
}, {
    timestamps: true
});

module.exports = mongoose.model('Note', NoteSchema);