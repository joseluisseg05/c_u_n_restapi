const { Router } = require('express');

const clienteC = require('../controllers/ClientesController');
const produC = require('../controllers/ProductosController');
const pedidC = require('../controllers/PedidosController');

const router = Router();

module.exports = function() {
    /* CLIENTES */
    
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

    /* PRODUCTOS */
    router.post('/productos', produC.subirImagen, produC.crear);
    router.get('/productos', produC.obtenerTodos);
    router.get('/productos/:idProducto', produC.obtnerById);
    router.put('/productos/:idProducto', produC.subirImagen, produC.actualizarData);
    router.delete('/productos/:idProducto', produC.eliminar);
    router.post('/productos/busqueda/:query', produC.buscarProducto);

    /* PEDIDOS */
    router.post('/pedidos', pedidC.crear);
    router.get('/pedidos', pedidC.buscarTodos);
    router.get('/pedidos/:idPedido', pedidC.buscarUno);
    router.put('/pedidos/:idPedido', pedidC.actualizar);
    router.delete('/pedidos/:idPedido', pedidC.eliminar);


    return router;
}