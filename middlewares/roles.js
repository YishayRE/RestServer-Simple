const{ response } = require('express');

//Obliga a ser Admin
const esAdminRole = (req, res = response, next) =>{
	if(!req.usuario){
		return res.status(500).json({
			msg: 'El token no verificó el rol'
		})
	}
	
	const {rol, nombre} = req.usuario;
	if(rol !== 'ADMIN_ROLE'){
		return res.status(500).json({
			msg: 'El usuario no es Admin :('
		})
	}
	next();
}
//Sirve ara diferentes roles
const tieneRol = (...roles) =>{
	return (req, res = response, next) =>{
		if(!req.usuario){
			return res.status(500).json({
				msg: 'El token no verificó el rol'
			});
		}

		if(!roles.includes(req.usuario.rol)){
			return res.status(401).json({
				msg: `Se requiere uno de estos roles ${roles}`
			});
		}

		next();
	}
}

module.exports = {
	esAdminRole,
	tieneRol
}