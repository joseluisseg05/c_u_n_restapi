const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

//conetar a mongo 
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/restapi', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const routes = require('./routers');
const { static } = require('express');

const app = express();

//bodyParser 
app.use(express.urlencoded({extends: true})); //datos que vienen de un formulario html 
app.use(express.json()); // datos de un json

//cors
app.use(cors())

app.use('/', routes())

app.use(static('uploads'));

app.listen(8080)