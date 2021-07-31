const express = require('express');
const bodyParser = require('body-parser');
const Note = require("./models/note.model")
const dbConfig = require('./config/db.config');
const mongoose = require('mongoose');
const jsonParser = bodyParser.json;
// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
//get data
app.get('/user', function (req, res) {
    Note.find().select('name').then((data) => {
        res.status(201).json(data);
        console.warn(data);
    })
})
//post API
app.post("/user", (req, res) => {
    const note = new Note({
        title: req.body.title || "Untitled Note",
        content: req.body.content,
        name: req.body.name,
        number: req.body.number
    });

    // Save database
    note.save()
        .then(data => {
            console.warn(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Note."
            });
        });
})
//delete API

app.delete('/user/:id', function (req, res) {
    Note.deleteOne({ _id: req.params.id }).then((result) => {
        res.json(result);
    }).catch(err => {
        console.warn(err);
    });
})

//Update API
app.put('/user/:id', function (req, res) {
    Note.updateOne({ _id: req.params.id }, {
        $set: {
            name: req.body.name,
            email: req.body.email,
            title: req.body.title
        }
    })
        .then((result) => {
            res.json(result);
        })
})
//Search API
app.get('/search/:name',function(req,res){
   var regex = new RegExp(req.params.name);
   Note.find({name: regex})
   .then((result)=>{
       res.json(result)
   })
})
// define a simple route
app.get('/', (req, res) => {
    res.json({ "message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes." });
});

// listen for requests
const post = 8000;
app.listen(post, () => {
    console.log("Server is listening on port :" + post);
});