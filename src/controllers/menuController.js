const menu = require('../models/menu');
const menuController = {};

menuController.viewPage = (req,res) =>{

};

menuController.findByProperty = async(property,value) =>{
    return menu.findByProperty(property,value);
};

menuController.findAll = async(columns) =>{
    if(typeof columns != "undefined"){

    }else{
        return await menu.findAll();
    }
};

module.exports = menuController;