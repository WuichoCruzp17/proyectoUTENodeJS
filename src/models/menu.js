const helpers = require('../lib/helpers');
let menu = {};

menu.table = {name:'MENU'};

menu.columns = {

    menuId:{
        column:'MENU_ID',
        primarykey:true
    },

    nombre:{
        column:'NOMBRE'
    },

    descripcion:{
        column:'DESCRIPCION'
    }
};

menu = helpers.setFunctionsModels(menu);
 module.exports = menu;