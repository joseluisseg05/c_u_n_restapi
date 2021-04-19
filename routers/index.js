const { Router } = require('express');

const clienteC = require('../controllers/ClientesController');
const produC = require('../controllers/ProductosController');
const pedidC = require('../controllers/PedidosController');
const userC = require('../controllers/UsuariosController');

const auth = require('../middlewares/auth');

const router = Router();

module.exports = function() {
    /* CLIENTES */
    
    //nuevos clientes
    router.post('/clientes', auth, clienteC.nuevoCliente);
    //obtener todos
    router.get('/clientes', auth, clienteC.mostrarTodos);
    //mostrar uno 
    router.get('/clientes/:idCliente', auth, clienteC.mostrarById);
    //actualizar
    router.put('/clientes/:idCliente', auth, clienteC.actualizarData);
    //eliminar
    router.delete('/clientes/:idCliente', auth, clienteC.eliminar);

    /* PRODUCTOS */
    router.post('/productos', auth, produC.subirImagen, produC.crear);
    router.get('/productos', auth, produC.obtenerTodos);
    router.get('/productos/:idProducto', auth, produC.obtnerById);
    router.put('/productos/:idProducto', auth, produC.subirImagen, produC.actualizarData);
    router.delete('/productos/:idProducto', auth, produC.eliminar);
    router.post('/productos/busqueda/:query', auth, produC.buscarProducto);

    /* PEDIDOS */
    router.post('/pedidos', auth, pedidC.crear);
    router.get('/pedidos', auth, pedidC.buscarTodos);
    router.get('/pedidos/:idPedido', auth, pedidC.buscarUno);
    router.put('/pedidos/:idPedido', auth, pedidC.actualizar);
    router.delete('/pedidos/:idPedido', auth, pedidC.eliminar);

    //Usuario
    router.post('/crear-cuenta', auth, userC.registrarUsuario);
    router.post('/iniciar-sesion', userC.autenticarUsuario);

    return router;
}