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

exports.autenticarUsuario = async (req, res, next) => {
    const { email, password } = req.body;
    const usuario = await Usuarios.findOne({ email })

    if(!usuario){
        await res.status(401).json({
            msj: 'Ese usuario no exite'
        })
    } else {
        if(!bcrypt.compareSync(password, usuario.password)) {
            await res.status(401).json({
                msj: 'Contraseña incorrecta'
            })
            next()
        } else {
            const token = jwt.sign({
                email: usuario.email,
                nombre: usuario.nombre,
                id: usuario._id
            }, 'PALABRASECRETA123', {expiresIn: '5h'});
            
            res.json({token})
        }
    }
}