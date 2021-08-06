var http = require('http');
const express = require('express');
const app = express();
var fs = require('fs')
const note = require('./models/note.model')
const bodyParser = require('body-parser');
//var encoder = bodyParser.urlencoded();
app.use(bodyParser.urlencoded({ extended: true }))
const dbConfig = require('./config/db.config');
const { log, warn } = require('console');
const router = express.Router();

//middleware
const chekUrl = function (req, res, next) {
    console.log('current router is ', req.originalUrl);
    next();
}
app.use(chekUrl);

//Template Engine(ejs)
app.set('view engine', 'ejs');
app.get("/profile/:name", function (req, res) {
    console.warn(req.params.name);
    data = { email: 'test@gmail.com', address: 'Bhavnager', Skills: ["nodeJS", "Android", "Java", "HTML", "Css"] }
    res.render('profile', { name: req.params.name, data: data })
})

// Make common header
app.post("/login", function (req, res) {
    console.warn(req.body);
    res.render('login')
})
app.get("/login", function (req, res) {
    console.log(req.query);
    // fs.appendFileSync('data.txt', JSON.stringify(req.query))
    res.render('login')
})
app.get("/home", function (req, res) {
    console.log(req.query);
    res.render('home')
})

app.get('/login', function (req, res) {
    //res.send('Hello');
    res.sendFile(__dirname + "/login.html");
})

app.get('/home', function (req, res) {
    console.log(req.query)
    // res.sendFile(__dirname + "/home.html");
    res.send(req.query.fname)
})
app.get('/', function (req, res) {
    const data = [
        { name: "Jaydeep", age: "20", email: "jaydeep@test.com" },
        { name: "Jaydeep", age: "20", email: "jaydeep@test.com" },
        { name: "Jaydeep", age: "20", email: "jaydeep@test.com" }
    ]
    res.writeHead(200, { 'Content-type': "text/html" })
    res.write(JSON.stringify(data));
    res.end();
})
const port = 8080
app.listen(port, () => {
    console.log('server running on port' + port);
});