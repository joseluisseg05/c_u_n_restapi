const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({path: '.env'});

//conetar a mongo 
mongoose.Promise = global.Promise;
mongoose.connect(process.env.BD_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const routes = require('./routers');
const { static } = require('express');

const app = express();

//bodyParser 
app.use(express.urlencoded({extends: true})); //datos que vienen de un formulario html 
app.use(express.json()); // datos de un json

//dominio en lista blanca
const whiteList = [process.env.FRONTEND_URL];
const corsOptions = {
    origin: (origin, callback) => {
        //revisar si viene de una url de la lista blanca
        const existe = whiteList.some(dominio => dominio === origin);
        if(existe){
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    }
}
//cors
app.use(cors(corsOptions))

app.use('/', routes())

app.use(static('uploads'));

const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 8080
app.listen(port, host, () => {
    console.log('Servidor online')
})