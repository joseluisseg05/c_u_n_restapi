const jwt = require('jsonwebtoken');

module.exports = (req, res, next ) => {
    //autorizaixon por header
    const authHeader = req.get('Authorization');

    if(!authHeader) {
        const error = new Error('No autenticado');
        error.statusCode = 401;
        throw error;
    }

    const token = authHeader.split(' ')[1];
    let revisarToken;

    try {
        revisarToken = jwt.verify(token, 'PALABRASECRETA123');    
    } catch (error) {
        error.statusCode= 500;
        throw error;
    }

    //token valido pero error
    if(!revisarToken){
        const error = new Error('No autenticado');
        error.statusCode = 401;
        throw error;
    }

    //todo ok
    next()
}