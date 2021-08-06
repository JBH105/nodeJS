const express = require('express');
const Note = require('./model');
const mongoose = require('mongoose');
const { connect } = require('mongodb');
const app = express();
const bodyParser = require('body-parser');
const url = 'mongodb+srv://jaydeep:6jq0RzewHrJPC2ix@cluster0.p7sbc.mongodb.net/mySeconddDatabase?retryWrites=true&w=majority'

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

mongoose.Promise = global.Promise;

console.log('Hello')
mongoose.connect(url, {
    useUnifiedTopology: true

}).then(() => {
    console.log('Successfully connect to Database');
}).catch(err => {
    console.log('not connect');
})

app.get('/user', (req, res) => {
    console.log(req.query);
    res.send(req.query.fname)
    // res.sendFile(__dirname+'/login.html')

})
app.post('/user', (req, res) => {
    const note = new Note({
        fname: req.body.fname,
        lname: req.body.lname
    })
    note.save().then((result) => {
        console.log(result)
    })
})

const port = 5000
app.listen(port, function (req, res) {
    console.log('port running on' + port);
})