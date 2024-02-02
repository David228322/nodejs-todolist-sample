const express = require('express');
const mongoose = require('mongoose');
const setupController = require('./controllers/setupController');
const apiController = require('./controllers/apiController');

var app = express();
app.use('/', function(req, res, next) {
    console.log('bitch');
    next();
})
app.use('/assets', express.static(__dirname + '/public'));

const mongoURI = 'mongodb://localhost:27017/todolist';
mongoose.connect(mongoURI);
const db = mongoose.connection;

app.set('view engine', 'ejs');

setupController(app);
apiController(app);


var port = process.env.PORT || 3000;
app.listen(port);