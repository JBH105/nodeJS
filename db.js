const fs = require('fs')
const express = require('express');
const mongoose = require('mongoose');
const url = 'mongodb+srv://jaydeep:6jq0RzewHrJPC2ix@cluster0.p7sbc.mongodb.net/myDatabase?retryWrites=true&w=majority'
const Note = require('./Login/model')
const bodyParser = require('body-parser');
const { send } = require('process');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

mongoose.Promise = global.Promise;

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('connected to database');
}).catch(err => {
    console.log('Error');
});

// app.set('view engine', 'ejs');
app.set('view engine', 'ejs')
app.get("/login", function (req, res) {
    console.log(req.query.username);
    console.log(req.query.password);
    console.log(req.query.country);
    console.log(req.query.subject);
    // fs.appendFileSync('data.txt', JSON.stringify(req.query))
    res.render('login')
})

app.post('/login', (req, res) => {
    const note = new Note({
        username: req.body.username,
        password: req.body.password,
        country: req.body.country,
        subject: req.body.subject
    })
    note.save().then((result) => {
        console.log(result);
    })
})

app.get('/user', (req, res) => {
    var query = { username: "meet" }
    var mysort = { username:1 };
    Note.find().sort(mysort).then((result) => {
        console.log(result);
        // res.send(result)
        res.render('data', { data: result })
    })
})

var port = 5050;
app.listen(port, function (req, res) {
    console.log(port);
});
