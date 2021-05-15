const validaCampos = require('../middlewares/validar');
const validaJWT = require('../middlewares/jsonwt');
const validaRol = require('../middlewares/roles');

module.exports = {
	...validaCampos,
	...validaJWT,
	...validaRol
}