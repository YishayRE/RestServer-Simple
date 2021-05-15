const {response} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuarios');

const usuariosGet = async(req, res = response) => {
	//const {q, nombre = 'Ninguno preciosa', apikey} = req.query;
	const query = {estado: true};
	const{limite = 5, desde = 0} = req.query;
/*
//cada una depende de la anterior
	const usuarios = await Usuario.find(query)
		.skip(Number(desde))
		.limit(Number(limite));

	const total = await Usuario.countDocuments(query);
*/
//ambas dependen de si mismas
	const [total, usuarios] = await Promise.all([
		Usuario.countDocuments(query),
		Usuario.find(query)
			.skip(Number(desde))
			.limit(Number(limite))
	]);
	res.json({total, usuarios});
}

const usuariosPut = async(req, res = response) => {
	const {id} = req.params;
	const{_id, password, google, correo, ...resto} = req.body;
	
	if(password){
		const salt = bcryptjs.genSaltSync();
		resto.password = bcryptjs.hashSync(password, salt);
	}

	const usuario = await Usuario.findByIdAndUpdate(id, resto);

	res.json(id);
}

const usuariosPost = async(req, res = response) => {
	const {nombre, correo, password, rol} = req.body;
	//const body = req.body;
	const usuario = new Usuario({nombre, correo, password, rol});

	const salt = bcryptjs.genSaltSync();
	usuario.password = bcryptjs.hashSync(password, salt);

	await usuario.save();

	res.json({
			msg: 'post API - controlador',
			usuario
		}
	);
}

const usuariosDelete = async(req, res = response) => {
	const {id} = req.params;
	//Borrado de un usuario permanentemente
	//const usuario = await Usuario.findByIdAndDelete(id);

	//Desaparecer un usuario
	const usuario = await Usuario.findByIdAndUpdate(id,{estado: false});

	const usuarioAutentificado = req.usuario;

	res.json({
			msg: `El usuario ${id} fue eliminado :(`,
			usuario,
			usuarioAutentificado
		}
	);
}

const usuariosPatch = (req, res = response) => {
	res.json({
			msg: 'patch API - controlador'
		}
	);
}

module.exports = {
	usuariosGet, 
	usuariosPut, 
	usuariosPost, 
	usuariosDelete, 
	usuariosPatch
}