const helpers = require('../lib/helpers');

let paginaMenu ={};

paginaMenu.table ={name:'PAGINA_MENU'};

paginaMenu.columns ={
    paginaMenuId:{
        column:'PAGINA_MENU',
        primarykey:true
    },

    menuId:{
        column:'MENU_ID'
    },

    paginaId:{
        column:'PAGINA_ID'
    }
    
};

paginaMenu = helpers.setFunctionsModels(paginaMenu);
module.exports = paginaMenu;