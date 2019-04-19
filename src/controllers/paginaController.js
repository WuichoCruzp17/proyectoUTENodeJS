const pagina = require('../models/pagina');

const paginaController = {};

paginaController.executeQuery =async (query, params)=>{
    return  await pagina.executeQuery(query, params);
};

module.exports = paginaController;