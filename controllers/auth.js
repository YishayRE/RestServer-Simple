const {response} = require('express');
const Usuario = require('../models/usuarios');
const bcryptjs = require('bcryptjs');
const {generarJWT} = require('../helpers/jwt');

const login = async(req, res = response) => {
	const {correo, password} = req.body;

	try{
		const usuario = await Usuario.findOne({correo});
		if(!usuario){
			res.status(400).json({
				msg: 'Usuario / Password no es correcto'
			})
		}

		if(!usuario.estado){
			res.status(400).json({
				msg: 'Usuario / Password no es correcto - estado: false'
			})
		}

		const validPassword = bcryptjs.compareSync(password, usuario.password)
		if(!validPassword){
			res.status(400).json({
				msg: 'Password no es correcto'
			})
		}

		const token = await generarJWT(usuario.id);

		res.json({
			usuario,
			token
		});
	}catch(error){
		console.log(error)
		return res.status(500).json({
			msg: 'Hable con el administrador'
		});
	}
}

module.exports = {
	login
}