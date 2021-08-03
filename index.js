const express = require('express');
const bodyParser = require('body-parser');
const Note = require("./models/note.model");
const dbConfig = require('./config/db.config');
const mongoose = require('mongoose');
//const jsonParser = bodyParser.json;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtkey = "jwt1234";
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
    Note.find().limit(2).then((data) => {
        res.status(201).json(data);
        console.warn(data);
    })
})
//post API
// app.post("/user", (req, res) => {
//     const note = new Note({
//         title: req.body.title || "Untitled Note",
//         content: req.body.content,
//         name: req.body.name,
//         number: req.body.number
//     });

//     // Save database
//     note.save()
//         .then(data => {
//             console.warn(data);
//         }).catch(err => {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while creating the Note."
//             });
//         });
// })
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
app.get('/find/:name', function (req, res) {
    var regex = new RegExp(req.params.name);
    Note.find({ name: regex })
        .then((result) => {
            res.json(result)
        }) 

})

//JWT(Bcrypt password) and stor data in mongoDb
app.post('/user', function (req, res) {
    const hase = 10;
    const hasepassword = 's0/\/\P4$$w0rD';
    //const someOtherPlaintextPassword = 'not_bacon';

    bcrypt.genSalt(hase, function (err, data) {
        bcrypt.hash(hasepassword, data, function (err, hash) {
            // Store hash in your password DB.
            const note = new Note({
                title: req.body.title,
                content: req.body.content,
                name: req.body.name,
                number: req.body.number,
                password: hasepassword
            })
            note.save().then((result) => {
                //JWT Token
                jwt.sign({result},jwtkey,(err,token)=>{
                    console.log(token)
                    res.json({message:result,token:token});
                })
                // res.status(201).json(result);
                // res.warn(result);
            })
        });
    });
    // console.warn(req.body, hasepassword);
    // res.end("Hello");
})

app.post('/user/login',function(req,res){
    Note.findOne({email:req.body.email}).then((result)=>{
        const decript = bcrypt.createDecipher(hase,hasepassword);
        console.warn(decript);
    })
})

// define a simple route
app.get('/', (req, res) => {
    res.json({ "message":"Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes." });
});

// listen for requests
const post = 9090;
app.listen(post, () => {
    console.log("Server is listening on port :" + post);
});