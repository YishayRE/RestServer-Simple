const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarios');

const validarJWT = async(req = request, res = response, next) =>{
	const token = req.header('x-token');
	if(!token){
		return res.status(401).json({
			msg: 'No hay un token'
		});
	}

	try{
		const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
		
		//leer usuario
		const usuario = await Usuario.findById(uid);
		
		if(!usuario){
			return res.status(401).json({
				msg: 'Token de usuario no existente'
			})
		}

		if(!usuario.estado){
			return res.status(401).json({
				msg: 'Token de usuario desconectado'
			})
		}

		req.usuario = usuario;

		next();
	}catch(error){
		console.log(error);
		res.status(401).json({
			msg: 'Token no valido >:('
		})
	}
}

module.exports = {
	validarJWT
}