const pool =    require('../database');
const passport = require('passport');
const pagina = require('../models/pagina');
const usuario = require('../models/usuario');
const empleado = require('../models/empleado');
const indexController = {};

indexController.getIndex =async (req,res)=>{
    console.log(await pagina.findById(1));
    console.log(await pagina.update({ columns:{
        nombre:{
            column:pagina.columns.nombre.column,
            value:'Luis Segura'
        },
        descripcion:{
            column:pagina.columns.descripcion.column,
            value:"Nueva"
        }
    }}));
    res.render('index');
};

indexController.getLogin =async(req,res)=>{
    res.render('ute/login',{usuario});
};
indexController.validateSession = async(req,res, next)=>{
    passport.authenticate('local.signin', {
        successRedirect: '/ute/index',
        failureRedirect: '/ute/login',
        failureFlash: true
      })(req, res, next);
};
indexController.getIndexAdministrador =(req,res, next)=>{
    res.render('ute/index');
};
indexController.getViewMaestros =(req,res)=>{
    res.render('ute/maestros');
};
indexController.getViewAcceso = async (req, res)=>{
    const _obj=  pagina;
    console.log("Consulta" ,await _obj.findById(1));
    res.render('ute/paginas');
};
module.exports =indexController;