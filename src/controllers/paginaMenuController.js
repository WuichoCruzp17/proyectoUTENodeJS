const paginaMenu = require('../models/paginaMenu');
const paginaMenuController = {};

paginaMenuController.findAll = async () => {
    return await paginaMenu.findAll();
};

module.exports = paginaMenuController;