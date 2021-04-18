const multer = require('multer');
const shortId = require('shortid');

const fs = require('fs');

const Productos = require('../models/Productos');

const configMulter = {
    limits: {
        fileSize: 100000
    },
    storage: fileStorage = multer.diskStorage({
        destination: (req, res, next) => {
            next(null, __dirname + '../../uploads/');
        },
        filename: (req, file, next) => {
            const extencion = file.mimetype.split('/')[1];//obtner los datos de la opcion 1
            next(null, `${shortId.generate()}.${extencion}`);
        }
    }),
    fileFilter(req, file, next ) {
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
            next(null, true)
        else 
            next(new Error('Formato de Imagen no valido'), false)
    }
}

const upload = multer(configMulter).single('imagen');

exports.subirImagen = (req, res, next) => {
    upload(req, res, function(error) {
        if(error) 
            res.json({
                msj: error
            });
        
        return next()
    })
} 

exports.crear = async(req, res, next) => {
    const producto = new Productos(req.body);
    try {
        if(req.file) 
            producto.imagen = req.file.filename;

        await producto.save();
        res.json({
            msj: 'Producto creado'
        })
    } catch (error) {
        res.send(error);
        next()
    }

}

exports.obtenerTodos = async(req, res, next) => {
    try {
        const productos = await Productos.find();
        res.json({
            productos
        })
    } catch (error) {
        res.send(error);
        next()
    }
}

exports.obtnerById = async(req, res, next) => {
    const id = req.params.idProducto;
    const producto = await Productos.findById(id);

    if(!producto) {
        res.json({
            msg: 'No existe ese producto'
        })
        next()
    }

    res.json({
        producto
    })
}

exports.actualizarData = async(req, res, next) => {
    try {
        const producto = await Productos.findById(req.params.idProducto);
        const data = req.body;

        if(req.file) 
            data.imagen = req.file.filename;
        else 
            data.imagen = producto.imagen 

        const nuevoProducto = await Productos.findOneAndUpdate(
            {_id: req.params.idProducto},
            data,
            { new: true}
        );

        res.json({
            nuevoProducto
        })
    } catch (error) {
        res.send(error);
        next()
    }
}

exports.eliminar = async(req, res, next) => {
    try {
        const producto = await Productos.findById(req.params.idProducto);

        if(producto.imagen ){
            const imgAntePath = __dirname + `../../uploads/${producto.imagen}`;
            fs.unlink(imgAntePath, (error)=> {
                if(error) console.log(error) 
                return;
            });
        }
        await Productos.findOneAndDelete({_id: req.params.idProducto});
        res.json({
            msj: 'Producto eliminado'
        })
    } catch (error) {
        res.send(error);
        next()
    }
}

exports.buscarProducto = async(req, res, next) => {
    try {
        const { query } = req.params;
        const producto = await Productos.find({
            nombre: new RegExp(query, 'i')
        })

        res.json({
            producto
        })
    } catch (error) {
        res.send(error);
        next()
    }
}