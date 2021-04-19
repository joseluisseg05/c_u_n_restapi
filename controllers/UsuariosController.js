const Usuarios = require('../models/Usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.registrarUsuario = async(req, res) => {
    const usuario = new Usuarios(req.body);
    usuario.password = await bcrypt.hash(req.body.password, 12);

    try {
        await usuario.save();
        res.json({
            msj: 'Usuario Creado Correctamente'
        })
    } catch (error) {
        console.log(error); 
        res.json({
            msj: 'Hubo un error'
        })
    }
}

exports.autenticarUsuario = () => {
    
}