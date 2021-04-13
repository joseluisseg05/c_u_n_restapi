const { Schema, model } = require('mongoose');

const clientesShema = new Schema({
    nombre: {
        type: String,
        trim: true
    },
    apellido: {
        type: String,
        trim: true
    }, 
    empresa: {
        type: String,
        trim: true
    },
    emial: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    telefono: {
        type: String,
        trim: true
    }
})

module.exports = model('Clientes', clientesShema);