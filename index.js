const express = require("express");
const bodyParser = require("body-parser");
const Note = require("./models/note.model");
const dbConfig = require("./config/db.config");
const mongoose = require("mongoose");
//const jsonParser = bodyParser.json;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtkey = "jwt1234";
// create express app
const app = express();
const cors = require("cors");
app.use(cors());
// var cors = require("cors");
// app.use(cors());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });
//get data
app.get("/user", function (req, res) {
  var sort = { name: 1 };
  Note.find()
    .sort(sort)
    .then((data) => {
      res.status(201).json(data);
      console.warn(data);
    });
});

//delete API
app.delete("/user/:id", function (req, res) {
  Note.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.warn(err);
    });
});

//Update API
app.put("/user/:id", function (req, res) {
  Note.updateOne(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        email: req.body.email,
        title: req.body.title,
      },
    }
  ).then((result) => {
    res.json(result);
  });
});
//Search API
app.get("/find/:name", function (req, res) {
  var regex = new RegExp(req.params.name);
  Note.find({ name: regex }).then((result) => {
    res.json(result);
  });
});

//JWT(Bcrypt password) and stor data in mongoDb
app.post("/user", function (req, res) {
  const note = new Note({
    title: req.body.title,
    content: req.body.content,
    name: req.body.name,
    number: req.body.number,
    password: bcrypt.hashSync(req.body.password, 10),
  });
  note.save().then((result) => {
    //JWT Token
    jwt.sign({ result }, jwtkey, (err, token) => {
      console.log(token);
      res.json({ message: result, token: token });
    });
  });
});

app.post("/user/login", function (req, res) {
  Note.findOne({ email: req.body.email }).then((result) => {
    const decript = bcrypt.createDecipher(hase, hasepassword);
    console.warn(decript);
  });
});

// define a simple route
app.get("/", (req, res) => {
  res.json({
    message:
      "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes.",
  });
});

// listen for requests
const post = 8000;
app.listen(post, () => {
  console.log("Server is listening on port :" + post);
});
