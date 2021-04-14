const { Schema, model  } = require('mongoose');

const pedidoSchema = new Schema({
    cliente: {
        type: Schema.ObjectId,
        ref: 'Clientes'
    },
    pedido: [{ //arreglo de productos
        producto: { //el producto
            type: Schema.ObjectId, //tipo de datos de mongo 
            ref: 'Productos' //refeciancia de la tabla 
        },
        cantidad: Number
    }],
    total: Number
});

module.exports = model('Pedidos', pedidoSchema)