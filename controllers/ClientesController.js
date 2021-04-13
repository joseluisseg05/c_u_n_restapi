const Clientes = require('../models/Clientes');

exports.nuevoCliente = async(req, res, next) => {
    //mapeo de datos y deja fue los que no estan en el modelo
    const cliente = new Clientes(req.body); 
    
    try {
        await cliente.save();
        res.json({
            msj: 'Se agrego un nuevo cliente'
        })
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.mostrarTodos = async(req, res, next) => {
    try {
        const clientes = await Clientes.find();
        res.json({
            clientes
        })
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.mostrarById = async(req, res, next) => {
    const id = req.params.idCliente;
    const cliente = await Clientes.findById(id);
    
    if(!cliente){
        res.json({
            msj: 'Este cliente no existe'
        })
        next()
    }

    res.json({
        cliente
    })
}

exports.actualizarData = async(req, res, next) => {
    try {
        const cliente = await Clientes.findOneAndUpdate(
            {_id: req.params.idCliente}, // id para saber que campo editar 
            req.body, // lo que va a editar  
            { new: true} // retorna el registro editado
        );
        res.json({cliente})
    } catch (error) {
        console.log(error),
        next()
    }
}

exports.eliminar = async(req, res, next) => {
    try {
        await Clientes.findOneAndDelete({id : req.params.idCliente});
        res.json({
            msj: 'deliminado'
        })
    } catch (error) {
        console.log(error);
        next();
    }
}