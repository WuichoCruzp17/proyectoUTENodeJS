const usuario = require('../models/usuario');
const usuarioController = {};

usuarioController.getUsuariosDinamic = async(columns,complement) =>{
    return await usuario.select(columns,complement);
};

module.exports = usuarioController;