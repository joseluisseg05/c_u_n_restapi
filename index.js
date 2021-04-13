const express = require('express');
const mongoose = require('mongoose');

//conetar a mongo 
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/restapi', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const routes = require('./routers')

const app = express();

//bodyParser 
app.use(express.urlencoded({extends: true})); //datos que vienen de un formulario html 
app.use(express.json()); // datos de un json

app.use('/', routes())

app.listen(8080)