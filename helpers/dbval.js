const Role = require('../models/role');
const Usuario = require('../models/usuarios');

const esRoleValido = async(rol = '') =>{
	const existeRol = await Role.findOne({rol});
	if(!existeRol){
		throw new Error(`El rol ${rol} no está registrado en la BD`)
	}
}

const existeCorreo = async(correo = '') =>{
	const existeC = await Usuario.findOne({correo});
	if(existeC){
		throw new Error(`El correo ${correo} ya fue registrado en otra cuenta`)
	}
}

const existeUsuario = async(id) =>{
	const existeU = await Usuario.findById(id);
	if(!existeU){
		throw new Error(`El usuario no existe`)
	}
}

module.exports = {
	esRoleValido,
	existeCorreo,
	existeUsuario
}