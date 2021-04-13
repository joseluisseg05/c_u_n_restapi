const { Router } = require('express');

const clienteC = require('../controllers/ClientesController');

const router = Router();

module.exports = function() {
    //nuevos clientes
    router.post('/clientes', clienteC.nuevoCliente);
    //obtener todos
    router.get('/clientes', clienteC.mostrarTodos);
    //mostrar uno 
    router.get('/clientes/:idCliente', clienteC.mostrarById);
    //actualizar
    router.put('/clientes/:idCliente', clienteC.actualizarData);
    //eliminar
    router.delete('/clientes/:idCliente', clienteC.eliminar);

    return router;
}