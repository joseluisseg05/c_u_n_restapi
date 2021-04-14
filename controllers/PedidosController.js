const Pedidos = require('../models/Pedidos');

exports.crear = async(req, res, next) => {
    const pedido = new Pedidos(req.body);

    try {
        await pedido.save(); 
        res.json({
            msj: 'Se agrego un nuevo pedido'
        })       
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.buscarTodos = async(req, res, next) => {
    try {
        const pedidos = await Pedidos.find().populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        });
        res.json({
            pedidos
        })
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.buscarUno = async(req, res, next) => {
    try {
        const pedido = await Pedidos.findById(req.params.idPedido)
        .populate('cliente')//obtner los todos los datos del cliente 
        .populate({//obtiene todos los datos del producto 
            path: 'pedido.producto', //como esta anidado accede al campo con su ruta
            model: 'Productos' // nombre del modelo
        });
        
        res.json({
            pedido
        })
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.actualizar = async(req, res, next) => {
    try {
        const pedido = await Pedidos.findOneAndUpdate(
            {_id: req.params.idPedido},
            req.body,
            {new: true}
        )
        .populate('cliente')//obtner los todos los datos del cliente 
        .populate({//obtiene todos los datos del producto 
            path: 'pedido.producto', //como esta anidado accede al campo con su ruta
            model: 'Productos' // nombre del modelo
        });

        res.json({
            pedido
        })
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.eliminar = async(req, res, next) => {
    try {
        await Pedidos.findOneAndDelete({_id: req.params.idPedido});
        res.json({
            msj: 'Pedido eliminado'
        })
    } catch (error) {
        console.log(error);
        next();
    }
}